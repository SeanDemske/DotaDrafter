class Chat {
  constructor(id, lobbyId) {
    this.id = id;
    this.messages = [];
    this.lobbyId = lobbyId;
  }

  getChatId() {
    return this.id;
  }
  
  addMessage(msg, username, team) {
    const message = {
      team,
      username,
      msg
    }

    this.messages.push(message);
  }

}
  
module.exports = { Chat };