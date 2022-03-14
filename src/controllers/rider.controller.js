const riderServies = require("../services/rider.service");
const moment = require("moment");
const fs = require("fs");
const multer = require("multer");
const multerConfig = require("../helper/multer");
const upload = multer(multerConfig.configMulter).fields([
  {
    name: "rider_image",
    maxCount: 1,
  },
  {
    name: "rider_vehicle_photo",
    maxCount: 1,
  },
]);
const postRiderUser = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const obj = {
      rider_username: req.body.rider_username,
      rider_password: req.body.rider_password,
      rider_name: req.body.rider_name,
      rider_phone: req.body.rider_phone,
      rider_email: req.body.rider_email,
      rider_addr_no: req.body.rider_addr_no,
      rider_addr_moo: req.body.rider_addr_moo,
      rider_addr_soi: req.body.rider_addr_soi,
      rider_addr_road: req.body.rider_addr_road,
      rider_addr_tambon: req.body.rider_addr_tambon,
      rider_addr_amphoe: req.body.rider_addr_amphoe,
      rider_addr_province: req.body.rider_addr_province,
      rider_addr_postcode: req.body.rider_addr_postcode,
      rider_photo: req.files.rider_image ? req.files.rider_image[0].path : null,
    };

    const result = await riderServies.createRiderUser(obj);
    if (!result.status) {
      // Del image in folder
      if (req.files.rider_image) {
        const path = req.files.rider_image[0].path;
        fs.unlinkSync(path);
      }
      if (req.files.rider_vehicle_photo) {
        const path = req.files.rider_vehicle_photo[0].path;
        fs.unlinkSync(path);
      }
      res.status(400).json(result);
      return;
    }

    const vhc = {
      rider_reg_no: req.body.rider_reg_no,
      rider_reg_province: req.body.rider_reg_province,
      rider_brand: req.body.rider_brand,
      rider_color: req.body.rider_color,
      rider_licence_expire: req.body.rider_licence_expire,
      rider_licence_no: req.body.rider_licence_no,
      rider_vehicle_photo: req.files.rider_vehicle_photo
        ? req.files.rider_vehicle_photo[0].path
        : null,
      ref_rider: result.result.id,
    };

    const resRider = await riderServies.createRiderVehicle(vhc);

    if (resRider) {
      res.status(200).json(resRider);
    } else {
      res.status(400).json({});
    }
  });
};

const putRiderUser = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const obj = {
      rider_uuid: req.body.rider_uuid,
      rider_username: req.body.rider_username,
      rider_name: req.body.rider_name,
      rider_phone: req.body.rider_phone,
      rider_email: req.body.rider_email,
      rider_addr_no: req.body.rider_addr_no,
      rider_addr_moo: req.body.rider_addr_moo,
      rider_addr_soi: req.body.rider_addr_soi,
      rider_addr_road: req.body.rider_addr_road,
      rider_addr_tambon: req.body.rider_addr_tambon,
      rider_addr_amphoe: req.body.rider_addr_amphoe,
      rider_addr_province: req.body.rider_addr_province,
      rider_addr_postcode: req.body.rider_addr_postcode,
      rider_photo: req.files.rider_image ? req.files.rider_image[0].path : null,
      updated_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };

    const result = await riderServies.updateRiderUser(obj);
    if (!result.status) {
      // Del image in folder
      if (req.files.rider_image) {
        const path = req.files.rider_image[0].path;
        fs.unlinkSync(path);
      }
      if (req.files.rider_vehicle_photo) {
        const path = req.files.rider_vehicle_photo[0].path;
        fs.unlinkSync(path);
      }
      res.status(200).json(result);
      return;
    }

    const vhc = {
      rider_reg_no: req.body.rider_reg_no,
      rider_reg_province: req.body.rider_reg_province,
      rider_brand: req.body.rider_brand,
      rider_color: req.body.rider_color,
      rider_licence_expire: req.body.rider_licence_expire,
      rider_licence_no: req.body.rider_licence_no,
      rider_vehicle_photo: req.files.rider_vehicle_photo
        ? req.files.rider_vehicle_photo[0].path
        : null,
      id: result.result.id,
      updated_at:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };

    const resRider = await riderServies.updateRiderVehicle(vhc)
     
    if (resRider.status) {
      res.status(200).json(resRider);
    } else {
      res.status(400).json(resRider);
    }
  });
};

const delRider = async (req, res) => {
  const obj = {
    rider_uuid: req.params.uuid,
  };
  const result = await riderServies.deleteRider(obj)
  if (!result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const getAllRider = async (req, res) => {
  const page = req.query.page;
  const result = await riderServies.selectAllRider(page);
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const getRiderByUID = async (req, res) => {
  const obj = {
    rider_uuid: req.params.uuid,
  };
  const result = await riderServies.selectRiderByUID(obj)
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const putRiderPassword = async (req, res) => {
  const obj = {
    rider_uuid: req.body.rider_uuid,
    rider_password: req.body.rider_password,
  };
  const result = await riderServies.changeRiderPassword(obj)
  if (result.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};


module.exports = {
  postRiderUser,
  putRiderUser,
  delRider,
  getAllRider,
  getRiderByUID,
  putRiderPassword
};
