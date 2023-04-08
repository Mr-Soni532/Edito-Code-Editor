const CodeModel = require("../model/code.model");

exports.serverTesting = (req, res) => {
    res.send({ msg: "edito server working fine." });
}

exports.saveCode = async (req, res) => {
    const { roomId, htmlCode, cssCode, jsCode } = req.body;
    try {
        let roomCode = await CodeModel.findOne({ roomId })
        if (roomCode) {
            roomCode.htmlCode = htmlCode;
            roomCode.cssCode = cssCode;
            roomCode.jsCode = jsCode;
            await roomCode.save();
            res.status(201).send({msg: 'Code saved successfully.'})
        } else {
            const newCode = new Code({
                roomId,
                htmlCode,
                cssCode,
                jsCode,
            });
            await newCode.save();
            res.status(201).send({msg: 'Code saved successfully.'})
        }
    } catch (error) {
        res.status(500).send({msg: 'Something went wrong while saving code.'})
    }
}