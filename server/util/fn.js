module.exports.initName =  async (userList, items) => {
  items.forEach(item => {
    userList.forEach(user => {
      if (item.sub_user === user.user_id) {
        item.sub_user_id = item.sub_user;
        item.sub_user = user.user_name;
        item.sub_icon = user.icon[0];
      }
    });
  });
  return items;
};