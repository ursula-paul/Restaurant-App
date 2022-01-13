import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //   res.render('index');
  res.send({ data: 'Api is working' });
});
export default router;
