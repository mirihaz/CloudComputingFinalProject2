//const axios = require('axios');
//const FormData = require('form-data');
const fs = require('fs');


async function sendImageForTagging(img) 
{
  const imageUrl = 'https://api.imagga.com/v2/tags';
  const apiKey = 'acc_ec714e38402e787';
  const apiSecret = '5336eb85a20beb7d5bcef0dd5323501c';

  try {
        // Base64 image encoding is a method of converting image data into a text format to safely transmit or store it.
		// It converts the image into a string representation using a specific encoding scheme. This allows images to be
		// included in text-based formats, such as HTML or JSON, without the need for separate image files.
		const imageBase64 = img.data.toString('base64');
        console.log('-----a----')
        // Create form data
        const formData = new FormData();
		formData.append('image_base64', imageBase64);
        console.log('-----b---')

        // Send the POST request
        const requestOptions = {
			method: 'POST',
			headers: {
				Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
			},
			body: formData,
		};  
        console.log('-----c----')

        const response = await fetch(imageUrl, requestOptions);
		const responseObj = await response.json();
        console.log(responseObj.result.tags);
	
        // Handle the response
        return(responseObj.result.tags)   
       
    }catch (error) {
        // Handle any errors
        console.error('Error:', error.response.data);
    }
 
}

// Call the function to send the image for tagging
module.exports=sendImageForTagging
