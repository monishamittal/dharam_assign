const campaignModel = require("../model/campaignModel.js");

const createCampaign = async function (req, res) {
    try {
        const campaign = req.body;
        let { short_token} = campaign

        const verifyshort_token = await campaignModel.findOne({ short_token: short_token })
        if (verifyshort_token) return res.status(400).send({ status: false, message: "short_token is already used" })

        const campaignCreated = await campaignModel.create(campaign);
        return res.status(201).send({ status: true, data: campaignCreated });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};


const redirectCampaign = async function (req, res) {
    try {
        const short_token = req.query.short_token;
        const campaign = campaignModel.findOne({ short_token: short_token, enabled: true })
        if (!short_token || !campaign) {
            return res.status(404).send({ status: true, message: "campaign not found with short_token" })
        }
        
        // var offers = campaign.offers
        // var after_massage = [];
        // var percent = 100,
        // r = 0;
        // offers.forEach(function(key){    
        //    after_massage.push({offer_url: key.offer_url,ratio_percentage: randomPercent()});
        //  })
        
        // function randomPercent(){               
        //  percent = percent - r ;
        //  r = Math.floor(Math.random() * percent);
        //  return r;  
        // }
        // console.log(after_massage);

        // let offerUrl = offers.offer_url;
        // if (click_id) {
        //     offerUrl = offerUrl.replace('{click_id}', click_id);
        // }
        // res.redirect(offerUrl);


    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};


const toggleCampaign = async function (req, res) {
    try {
        let campaignId = req.params.id
        const isCompaign = await campaignModel.findOne({ _id: campaignId })
        if (!isCompaign) return res.status(404).send({ status: false, message: 'the campaign with given ID does not exists ! ' })

        if (isCompaign.enabled) {
            const updateCampaign = await campaignModel.findByIdAndUpdate({ _id: campaignId }, { enabled: false }, { new: true })
            return res.status(200).send({ data: `toggle changed to ` + updateCampaign.enabled })
        } else {
            const updateCampaign = await campaignModel.findByIdAndUpdate({ _id: campaignId }, { enabled: true }, { new: true })
            return res.status(200).send({ data: `toggle changed to ` + updateCampaign.enabled })
        }

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};


module.exports = { createCampaign, toggleCampaign, redirectCampaign };
