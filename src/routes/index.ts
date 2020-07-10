import * as express from "express";
const router = express.Router();

router.use('/',require('./tables'));
router.use('/tables',require('./orders'));

module.exports = router;