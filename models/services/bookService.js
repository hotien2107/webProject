const Category = require('../Category');
const Book = require('../Book');

const mongoose = require('mongoose');


const FILTER = {isDeleted: false};


exports.list = async (pageNum, booksPerPage) => {
    const books = await Book.paginate(FILTER, {
        page: pageNum,
        limit: booksPerPage
    });

    return books;
}

exports.sort_list = async (pageNum, booksPerPage, sort_value) => {
    const books = await Book.paginate(FILTER, {
        sort: {
            price: sort_value
        },
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}

exports.category_list = async (pageNum, booksPerPage, category) => {
    const filter = FILTER;
    
    filter.category = mongoose.Types.ObjectId(category);
    
    const books = await Book.paginate(filter, {
        page: pageNum,
        limit: booksPerPage
    });

    return books;
}

exports.category_sort_list = async (pageNum, booksPerPage, sort_value, category) => {
    const books = await Book.paginate({
        category: mongoose.Types.ObjectId(category)
    }, {
        sort: {
            price: sort_value
        },
        page: pageNum,
        limit: booksPerPage
    });

    return books;
}

exports.search_sort_list = async (pageNum, booksPerPage, sort_value, q) => {
    const filter = FILTER;
    filter.name = {'$regex': q, $options:"$i"};

    const books = await Book.paginate(filter, {
        sort: {
            price: sort_value
        },
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}

exports.search_category_list = async (pageNum, booksPerPage, category, q) => {
    const filter = FILTER;
    
    filter.category = mongoose.Types.ObjectId(category);
    filter.name = {'$regex': q, $options:"$i"};

    const books = await Book.paginate(filter, {
        page: pageNum,
        limit: booksPerPage
    });

    return books;
}

exports.search_category_sort_list = async (pageNum, booksPerPage, sort_value, category, q) => {
    const filter = FILTER;
    
    filter.category = mongoose.Types.ObjectId(category);
    filter.name = {'$regex': q, $options:"$i"};

    const books = await Book.paginate(filter, {
        sort: {
            price: sort_value
        },
        page: pageNum,
        limit: booksPerPage
    });

    return books;
}

exports.related_list = async (bookCategory, bookName) => {
    const books = await Book.find({
        category: bookCategory,
        name: {$ne: bookName}
    }).limit(4);
    return books;
}


exports.get = async (id) => {
    const book = await Book.findOne({ _id: new mongoose.Types.ObjectId(id)});

    return book;
}

exports.get_recommended = async (books_per_page) => {
    const books = await Book.find(FILTER).sort({views: 'desc'}).limit(books_per_page);

    return books;
}


exports.search = async (pageNum, booksPerPage, q) => {
    const books = await Book.paginate({
        name: {'$regex': q, $options:"$i"}
    }, {
        page: pageNum,
        limit: booksPerPage
    });

    return books;
}