// API to get support list
exports.list = async (req, res, next) => {
  try {
    return res.send({
      success: true, message: 'Support data fetched successfully', data: []
    })
  } catch (error) {
    return next(error)
  }
}


