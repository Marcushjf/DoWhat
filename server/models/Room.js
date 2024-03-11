class Room {
    constructor(players, size, id) {
        this.players = players;
        this.size = size;
        this.id = id
    }

    addPlayer(player) {
        // Check if the player is already in the room
        if (!this.players.includes(player)) {
            if(this.size<4){
                this.size++;
                this.players = [...this.players, player];
            }
            else{
                console.log(`Room is already full.`);
                return false
            }    
        } else {
            console.log(`Player ${player} is already in the room.`);
            return false
        }
        return true
    }

    removePlayer(player) {
        if (this.players.includes(player)) {
            this.size--;
            this.players = this.players.filter(existingPlayer => existingPlayer !== player);
        } else {
            console.log(`Player ${player} is not in the room.`);
            return false;
        }
        return true;
    }    
}

function addPlayer(rooms, id, username){
    for (i=0;i< rooms.length; i++){
        if(rooms[i].id === id){
            if(rooms[i].addPlayer(username)){
                return rooms[i].players
            }
            return []
        }
    }
    let newRoom = new Room([username], 1, id)
    rooms.push(newRoom)
    return newRoom.players
}

function removePlayer(rooms, username) {
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].removePlayer(username)) {
            return {newList: rooms[i].players, room_id: rooms[i].id};
        }
    }
    return [];
}

module.exports = { addPlayer, removePlayer };
