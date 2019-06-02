var express = require('express')
var router = express.Router()
var db = require('../models/index');
var Book = db.Book;

/**
 * 
 * PART: Index
 * 
 */
router.get('/',function(req,res,next){
    var page=0;
    if(req.query.page !== undefined){
        if(req.query.page > 1){
            page = (req.query.page-1) * 5
        }
    }
    Book.findAndCountAll({
        order:[
            ['createdAt','DESC']
        ],
        limit: 5,
        offset: page
    }).then(Books =>{
        res.render('book/index',{
            title:'Book Index',
            data:Books.rows,
            pages:Math.ceil(Books.count/5)
        });
    })
})

/**
 * 
 * PART: View for creating new record.
 * 
 */
router.get('/create',function(req,res,next){
    res.render('book/create',{
        title:'new Book',
    });
})

/**
 * 
 * PART: Process for creating new record.
 * 
 */
router.post('/store',function(req,res,next){  
    var bookTitle = req.body.title
    var bookDescription = req.body.description
    Book.create({
        bookTitle: bookTitle,
        bookDescription:bookDescription,
        bookAuthor:1
    }).then(Book=>{
        if(Book){
            res.redirect('/book');
        }else{
            res.send('Failed to create.')
        }
    })
})

/**
 * 
 * PART: View for Record Detail.
 * 
 */
router.get('/:id',function(req,res,next){
    var bookId = req.params.id
    // console.log(req.params);
    Book.findOne({
        where:{
            id: bookId
        }
    }).then(Book =>{
        if(Book){
            res.render('book/show',{
                title:Book.bookTitle,
                data:Book
            });            
        }else{
            res.send('Data Not Found')
        }
    })
})

/**
 * 
 * PART: View for Record Edit.
 * 
 */
router.get('/:id/edit',function(req,res,next){    
    var bookId = req.params.id
    Book.findOne({
        where:{
            id: bookId
        }
    }).then(Book =>{
        if(Book){
            res.render('book/edit',{
                title:"Edit "+Book.bookTitle,
                data:Book
            });            
        }else{
            res.send('Data Not Found')
        }
    })
})

/**
 * 
 * PART: Process for Record Edit.
 * 
 */
router.post('/:id/update',function(req,res,next){    
    var bookId = req.params.id
    var bookTitle = req.body.title
    var bookDescription = req.body.description
    Book.findOne({
        where:{
            id: bookId
        }
    }).then(Book =>{
        if(Book){
            console.log(req.body)
            Book.update({
                bookTitle: bookTitle,
                bookDescription:bookDescription
            }).then(()=>{
                res.redirect('/book');
            })          
        }else{
            res.send('Data Not Found')
        }
    })
})

/**
 * 
 * PART: Process for Delerting Record.
 * 
 */
router.post('/delete',function(req,res,next){
    var bookId = req.params.id;
    Book.destroy({
        where:{
            id:bookId
        }
    }).then(()=>{
        res.redirect('/book');
    }).catch(err=>{
        res.send(err)
    })
});

router.get('/create',function(req,res,next){
    res.render('book/create');
})

module.exports = router