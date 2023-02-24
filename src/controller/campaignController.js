const campaignModel = require("../model/campaignModel.js");

//----------------------creating campaign------------------
const createCampaign = async function (req, res) {
    try {
        const campaign = req.body;
        let { short_token } = campaign

        //------------------verfying short_token---------------------
        const verifyshort_token = await campaignModel.findOne({ short_token: short_token })
        if (verifyshort_token) return res.status(400).send({ status: false, message: "short_token is already used" })

        const campaignCreated = await campaignModel.create(campaign);
        return res.status(201).send({ status: true, data: campaignCreated });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

//-------------------redirecting to click _id------------------
const redirectCampaign = async function (req, res) {
    try {

        let short_token = req.query.short_token;
        let getting_click_id = req.query.click_id;

        if (!short_token)
            return res.status(404).send({ status: false, message: 'short_token not present' })

        let getCampaign = await campaignModel.findOneAndUpdate({ short_token: short_token, enabled: true, new: true }, { $inc: { requests: +1 } })
        if (!getCampaign)
            return res.status(404).send(`Campaign not found`)

        //---------dividing ratio_percentage--------------
        let percent = 0
        let ratio_percentage = getCampaign.offers[percent].ratio_percentage
        let requestCount = getCampaign.requests % 10;
        let requestPercent = ratio_percentage / 10;
        if (requestCount > requestPercent) percent = 1;

        //-----------redirecting-------------
        let reg = "{click_id}"
        let url = getCampaign.offers[percent].offer_url
        let response = url.replace(reg, getting_click_id)
        console.log(response)

        return res.status(302).redirect(302, `${response}`)


    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};


//--------------enable true or false----------------------
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
