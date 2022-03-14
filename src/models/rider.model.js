const { pgDB } = require("../configs/db.connect");

const findUsername = async (obj) => {
  sql =
    "SELECT rider_uuid FROM user_rider WHERE rider_username=${rider_username} AND is_deleted != 99";

  try {
    const result = await pgDB.query(sql, obj);
    if (result[0] == undefined || obj.rider_uuid == result[0].rider_uuid) {
      data = {
        status: true,
        message: ``,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `ชื่อผู้ใช้งานนี้ถูกใช้แล้ว`,
        result: [],
      };
    }

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const findIdRiderByUUID = async (obj) => {
  sql = "SELECT id FROM user_rider WHERE rider_uuid=${rider_uuid}";

  try {
    const result = await pgDB.query(sql, obj);

    data = {
      status: true,
      message: ``,
      result: result[0],
    };

    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const createRiderUser = async (obj) => {
  sql = "INSERT INTO user_rider(${this:name}) VALUES(${this:csv}) RETURNING id";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Create Success`,
        result: result[0],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const createRiderVehicle = async (obj) => {
  sql =
    "INSERT INTO rider_vehicle(${this:name}) VALUES(${this:csv}) RETURNING id";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Create Success`,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const updateRiderUser = async (obj) => {
  if (obj.rider_photo != null) {
    var photo = "rider_photo=${rider_photo},";
  } else {
    var photo = "";
  }

  sql =
    "UPDATE user_rider SET " +
    "rider_username=${rider_username}," +
    "rider_name=${rider_name}," +
    "rider_phone=${rider_phone}," +
    "rider_email=${rider_email}," +
    "rider_addr_no=${rider_addr_no}," +
    "rider_addr_moo=${rider_addr_moo}," +
    "rider_addr_soi=${rider_addr_soi}," +
    "rider_addr_road=${rider_addr_road}," +
    "rider_addr_tambon=${rider_addr_tambon}," +
    "rider_addr_amphoe=${rider_addr_amphoe}," +
    "rider_addr_province=${rider_addr_province}," +
    photo +
    "rider_addr_postcode=${rider_addr_postcode}," +
    "updated_at=${updated_at} " +
    " WHERE rider_uuid=${rider_uuid} RETURNING id";

  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Update Success`,
        result: result[0],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const updateRiderVehicle = async (obj) => {
  if (obj.rider_photo != null) {
    var photo = "rider_vehicle_photo=${rider_vehicle_photo},";
  } else {
    var photo = "";
  }

  sql =
    "UPDATE rider_vehicle SET " +
    "rider_reg_no=${rider_reg_no}," +
    "rider_reg_province=${rider_reg_province}," +
    "rider_brand=${rider_brand}," +
    "rider_color=${rider_color}," +
    "rider_licence_no=${rider_licence_no}," +
    photo +
    "rider_licence_expire=${rider_licence_expire} " +
    " WHERE ref_rider = ${id} RETURNING id";

  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Update Success`,
        result: result[0],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const deleteRider = async (obj) => {
  sql =
    "UPDATE user_rider SET is_deleted=99 WHERE rider_uuid=${rider_uuid} RETURNING *";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Delete Success`,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectAllRider = async (page) => {
  const itemsPerPage = 10;
  const offset = (parseInt(page) - 1) * itemsPerPage;
  sql = `SELECT rider_uuid,rider_username,rider_name,rider_phone,rider_vehicle.rider_reg_no 
    FROM user_rider INNER JOIN rider_vehicle ON rider_vehicle.ref_rider = user_rider.id 
    WHERE is_deleted != 99 ORDER BY rider_username ASC LIMIT ${itemsPerPage} OFFSET ${offset}`;
  try {
    const result = await pgDB.query(sql);
    data = {
      status: true,
      message: `Success`,
      result: result,
    };
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const selectCountRider = async () => {
  sql = `SELECT COUNT(*) FROM user_rider WHERE is_deleted != 99`;
  let count = await pgDB.query(sql);
  return count[0].count;
};

const selectRiderByUID = async (obj) => {
  sql =
    "SELECT " +
    "rider_uuid,rider_username,rider_name,rider_phone,rider_email,rider_addr_no,rider_addr_moo,rider_addr_soi," +
    "rider_addr_road,rider_addr_tambon,rider_addr_amphoe,rider_addr_province,rider_addr_postcode,rider_photo," +
    "rider_vehicle.rider_reg_no,rider_vehicle.rider_reg_province,rider_vehicle.rider_brand,rider_vehicle.rider_color," +
    "rider_vehicle.rider_licence_no,rider_vehicle.rider_licence_expire,rider_vehicle.rider_vehicle_photo " +
    "FROM user_rider INNER JOIN rider_vehicle ON rider_vehicle.ref_rider = user_rider.id " +
    "WHERE ref_rider=${ref_rider} AND is_deleted != 99";
  try {
    const result = await pgDB.query(sql, obj);
    data = {
      status: true,
      message: `Success`,
      result: result[0],
    };
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

const updateRiderPassword = async (obj) => {
  sql =
    "UPDATE user_rider SET rider_password=${rider_password} WHERE rider_uuid=${rider_uuid} RETURNING *";
  try {
    const result = await pgDB.query(sql, obj);
    if (result[0]) {
      data = {
        status: true,
        message: `Change Password Success`,
        result: [],
      };
    } else {
      data = {
        status: false,
        message: `Unsuccess`,
        result: [],
      };
    }
    return data;
  } catch (error) {
    data = {
      status: false,
      message: `Error ${error}`,
      result: [],
    };
    return data;
  }
};

module.exports = {
  findUsername,
  findIdRiderByUUID,
  createRiderUser,
  createRiderVehicle,
  updateRiderUser,
  updateRiderVehicle,
  deleteRider,
  selectAllRider,
  selectCountRider,
  selectRiderByUID,
  updateRiderPassword,
};
