const riderModel = require("../models/rider.model");
const bcrypt = require("bcryptjs");
const jwt = require("../helper/jwt");
const moment = require("moment");

const createRiderUser = async (obj) => {
  let result = await riderModel.findUsername(obj);
  if (!result.status) {
    return result;
  }
  obj.rider_password = await bcrypt.hash(obj.rider_password, 8);
  return await riderModel.createRiderUser(obj);
};

const createRiderVehicle = async (obj) => {
  return await riderModel.createRiderVehicle(obj);
};

const updateRiderUser = async (obj) => {
  let result = await riderModel.findUsername(obj);
  if (!result.status) {
    return result;
  }
  return await riderModel.updateRiderUser(obj);
};

const updateRiderVehicle = async (obj) => {
  return await riderModel.updateRiderVehicle(obj);
};

const deleteRider = async (obj) => {
  let result = await riderModel.deleteRider(obj);
  return result;
};

const selectAllRider = async (page) => {
  const itemsPerPage = 10;
  if (!page) {
    return { status: false, message: `No Page` };
  }
  let count = await riderModel.selectCountRider();
  let result = await riderModel.selectAllRider(page);
  if (!result.status) {
    return result;
  }
  let pageCount = Math.ceil(parseFloat(count) / itemsPerPage);
  let data = {
    status: result.status,
    message: result.message,
    result: {
      page_count: pageCount,
      page_current: parseInt(page),
      data: result.result,
    },
  };
  return data;
};

const selectRiderByUID = async (obj) => {
  let resRider = await riderModel.findIdRiderByUUID(obj);
  if (!resRider.status) {
    return resRider;
  }
  let nData = {
    ref_rider: resRider.result.id,
  };
  let result = await riderModel.selectRiderByUID(nData);
  result.result.rider_licence_expire = moment(result.result.ider_licence_expire).format("YYYY-MM-DD")
  return result;
};

const changeRiderPassword = async (obj) => {
  obj.rider_password = await bcrypt.hash(obj.rider_password, 8);
  return await riderModel.updateRiderPassword(obj);
};

module.exports = {
  createRiderUser,
  createRiderVehicle,
  updateRiderUser,
  updateRiderVehicle,
  deleteRider,
  selectAllRider,
  selectRiderByUID,
  changeRiderPassword,
};
