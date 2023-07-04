const express=require('express')
const router=express.Router()
const axios=require('axios')
const cheerio = require('cheerio');
const Insights=require('../models/insightSchema')

/* request contains the url sent as a post request and the response contains the webLinks, mediaLinks
   and the word count of the website
*/
router.post('/postinsight',async (req,res)=>{
    const url = req.body.url;
    try {
        const response = await axios.get(url);
        const html = response.data;

        // cheerio package can be used for scraping from html code
        const $ = cheerio.load(html);
        // Contains the text present iside the body HTML tag
        const text = $('body').text();

        // Remove unnecessary white spaces and newlines
        const cleanedText = text.replace(/\s+/g, ' ').trim();
        // Split the text into an array of words
        const words = cleanedText.split(' ');
    
        // Count the number of words
        const wordCount = words.length;

        // Extract all anchor tags (hyperlinks)
        const anchorTags = $('a');

        // Iterate over the anchor tags and extract their href attribute
        const hyperlinks = [];
        anchorTags.each((index, element) => {
            const href = $(element).attr('href');
            if(href.startsWith("http"))
                hyperlinks.push(href);
        });

        // Extract all image tags
        const imageTags = $('img');

        // Iterate over the image tags and extract their src attribute
        const mediaLinks = [];
        imageTags.each((index, element) => {
            const src = $(element).attr('src');
            mediaLinks.push(src);
        });

        // Extract all video tags
        const videoTags = $('video');

        // Iterate over the video tags and extract their src attribute
        videoTags.each((index, element) => {
            const src = $(element).attr('src');
            mediaLinks.push(src);
        });
        const insight={
            domainName:url,
            wordCount:wordCount,
            webLinks:hyperlinks,
            mediaLinks:mediaLinks
        }
        const insightObj=new Insights(insight)
        await insightObj.save()
        return res.json(insight)
      } catch (err) {
        console.error('Error:', err);
        res.send("Some internal error occured")
      }
})

// This route returns all the insights present inside the database
router.get('/getinsights',async (req,res)=>{
    const data = await Insights.find({})
    return res.json({data:data})
})

// This route updates the favourite field of a particular insight identified by its Id
router.put('/updateinsight/:insightId', async (req,res)=>{
    const data=await Insights.findByIdAndUpdate({_id:req.params.insightId},{favourite:true},{new:true})
    return res.json({data:data})
})

// This route deletes a particular insight by its Id
router.delete('/deleteinsight/:insightId', async (req,res)=>{
    const data=await Insights.findByIdAndDelete({_id:req.params.insightId})
    return res.json({data:data})
})

module.exports=router