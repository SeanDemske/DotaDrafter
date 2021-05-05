class Chat {
  constructor(id, lobbyId) {
    this.id = id;
    this.lobbyId = lobbyId;
  }
  getChatId() {
    return this.id;
  }
}
  
module.exports = { Chat };