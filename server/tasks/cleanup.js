const createDebug = require('debug');
const User = require('../models/User');
const Message = require('../models/Message');
const Chat = require('../models/Chat');

const info = createDebug('cleanup:info');

async function cleanup() {
  info('Running');
  const expiredUsers = await User.find({
    expiresAt: { $lte: new Date() }
  }).distinct('_id');
  info('Found the following expired users: %o', expiredUsers);
  const messageDeleteResult = await Message.deleteMany({ author: { $in: expiredUsers } });
  info('Deleted %s messages', messageDeleteResult.deletedCount);

  // Removing expired participants
  const chatsUpdateResult = await Chat.updateMany({
    participants: { $in: expiredUsers }
  }, {
    $pull: { participants: { $in: expiredUsers } }
  });
  info('Deleted expired participants in %s chats', chatsUpdateResult.nModified);

  // Removing chats of expired participants
  const chatsDeleteResult = await Chat.deleteMany({ owner: { $in: expiredUsers } });
  info('Deleted %s chats with expired owners', chatsDeleteResult.deletedCount);

  const userDeleteResult = await User.deleteMany({ _id: { $in: expiredUsers } });
  info('Deleted %s users', userDeleteResult.deletedCount);
  
  info('Finished');
}

module.exports = cleanup;