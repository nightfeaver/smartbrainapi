const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '43921cbcf15440adad9ce85e9a6c7f98'
});

const handleApiCall = (req, res) => {
 app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
 .then(response => {res.json(response)})
 .catch(err => console.log(err));
}

const handleImage = (req,res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  .then(entries => {
  	res.status(200).json(entries[0])
  	console.log(entries[0])})
}

module.exports={
	handleImage,
	handleApiCall
}