const Settings = require('../../models/settings.model')

// API to edit Settings
exports.edit = async (req, res, next) => {
    try {
        let payload = req.body;
        //APPLY VALIDATIONS HERE BEFORE SAVING
        const settings = await Settings.updateOne({}, { $set: payload }, { upsert: true })
        return res.send({ success: true, message: 'Settings updated successfully', settings })
    } catch (error) {
        return next(error)
    }
}

// API to get Settings
exports.get = async (req, res, next) => {
    try {
        const settings = await Settings.findOne({}, { __v: 0, createdAt: 0, updatedAt: 0 }).lean(true)
        if (settings)
            return res.json({ success: true, message: 'Settings retrieved successfully', settings })
        else
            return res.json({ success: false, message: "Settings not found" })
    } catch (error) {
        return next(error)
    }
}