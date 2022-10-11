import User from "../models/User.js";
import moment from "moment";

// @desc Get user profile
// @route GET /api/user/profile
// @access Private

const getUserProfile = async (req, res) => {
  console.log(req.body, req.id);
  try {
    let user = await User.findById(req.id);

    res.status(201).json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  console.log(req.body, req.id);
  try {
    let users = await User.find();
    console.log(users);

    res.json(users);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const logs = async (req, res) => {
  console.log(req.query);
  try {
    const searchParam = req.query.searchString
      ? {
          $or: [
            {
              fullName: { $regex: `${req.query.searchString}`, $options: "i" },
            },
            {
              email: { $regex: `${req.query.searchString}`, $options: "i" },
            },
          ],
        }
      : {};

    const statusFilter = req.query.status && { status: req.query.status };

    const from = req.query.from;
    const to = req.query.to;

    let dateFilter = {};
    if (to && from) {
      dateFilter = {
        createdAt: {
          $gte: moment.utc(new Date(from)).startOf("day"),
          $lte: moment.utc(new Date(to)).endOf("day"),
        },
      };
    }

    const users = await User.paginate(
      {
        ...searchParam,
        ...statusFilter,
        ...dateFilter,
      },
      {
        page: req.query.page ? req.query.page : 1, // current page
        limit: req.query.perPage ? req.query.perPage : 10, // perpage records
        lean: true,
      }
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export { getUserProfile, logs, getUsers };
