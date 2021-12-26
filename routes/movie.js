const express = require('express');
const router = express.Router();
//Movie dosyasını mongodb için import etme
const Movie = require('../models/Movie')

router.get('/', (req, res) => {
  const promise = Movie.find({ });
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  })
  
});

router.get('/top10', (req, res) => {
  const promise = Movie.find({ }).limit(10).sort({ imdb_score: -1});
  
  promise.then((data) =>{
    res.json(data);
  }).catch((err) =>{
    res.json(err);
  });
});

router.get('/:movie_id',(req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  
  promise.then((movie) => {
    if(!movie)
    next({message: 'Movie not found', code:99 });
    res.json(movie);
  }).catch((err) =>{
    res.json(err);
  });
});

router.put('/:movie_id',(req, res, next) =>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id, 
    req.body,
    {
      new: true,
    }
    );
    promise.then((movie) => {
      if(!movie)
        next({message: 'Movie not found', code:99});
      res.json(movie);
    }).catch((err) =>{
      res.json(err);
    });
  });
  router.post('/', (req, res, next) => {
    //const {title, imdb_score,category, country, year} = req.body;
    
    const movie = new Movie(req.body);
    console.log(movie)
    movie.save((err, data)=>{
      if(err)
      res.json(err);
      res.json(data);
    });
    
  });
router.delete('/:movie_id',(req, res, next) =>{
  const promise = Movie.findByIdAndDelete(req.params.movie_id);

  promise.then((movie) =>{
    if(!movie)
      next({message: 'Movie not found', code:99 });
    res.json('Film Silindi.');
  }).catch((err) =>{
    res.json(err);
  });
});
//between
router.get('/between/:start_year/:end_year', (req, res, next) =>{
  const {start_year, end_year} = req.params;
  const promise = Movie.find(
    {
      //gte ve lte yerine gt ve lt yazdığımızda yapılan işlem 
      //e harfi eşittir anlamına geldiği için e siz sadece
      //arasındaki tarihleri alacaktır.
      year:{"$gte": parseInt(start_year), "$lte": parseInt(end_year)}
    }
  );
promise.then((movie) =>{
  if(!movie)
    next({message: 'Movie not found', code:99 });
  res.json(movie)
}).catch((err) =>{
  res.json(err);
})
});
  

  
  module.exports = router;
  