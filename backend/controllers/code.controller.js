const CodeModel = require("../model/code.model");
const { v4: uuidv4 } = require('uuid');
const sampleTemplate = require('../utils/sampleTemplate')
exports.serverTesting = (req, res) => {
    res.send({ msg: "edito server working fine." });
}

exports.fetchCodeByRoomId = async (req, res) => {
    const roomId = req.params.roomId;
    try {
        let roomCode = await CodeModel.findOne({ roomId })
        if (roomCode){
            res.send({ roomCode })
        }
        else {
            res.send({roomCode: {
                htmlCode: sampleTemplate.html(),
                cssCode: sampleTemplate.css(),
                jsCode: '// Ctrl+space for suggestion.'
            }})
        }
    } catch (error) {
        res.status(500).send({ msg: 'Something went wrong while fetching code.' })
    }
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
            res.status(201).send({ msg: 'Code saved successfully.' })
        } else {
            const newCode = new CodeModel({
                roomId,
                htmlCode,
                cssCode,
                jsCode,
            });
            await newCode.save();
            res.status(201).send({ msg: 'Code saved successfully.' })
        }
    } catch (error) {
        res.status(500).send({ msg: 'Something went wrong while saving code.' })
        console.log(error)
    }
}

exports.generateUUID = (req, res) => {
    let id = uuidv4();
    res.send({ id });
}