import { v4 as uuidv4 } from 'uuid';

// Users Table
export const users = [
	{
		id: uuidv4(),
		name: 'John Doe',
		email: 'john.doe@example.com',
		password: 'hashed_password',
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		name: 'Jane Smith',
		email: 'jane.smith@example.com',
		password: 'hashed_password',
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		name: 'Mike Johnson',
		email: 'mike.johnson@example.com',
		password: 'hashed_password',
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		name: '동욱 김',
		email: 'dongwook.kim@example.com',
		password: 'hashed_password',
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		name: 'Alice Brown',
		email: 'alice.brown@example.com',
		password: 'hashed_password',
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		name: 'Bob Davis',
		email: 'bob.davis@example.com',
		password: 'hashed_password',
		created_at: new Date(),
		updated_at: new Date()
	}
];

// Groups Table
export let groups = [
	{
		id: 1,
		name: 'Basketball Enthusiasts',
		description: 'A group for basketball lovers',
		color: '#0000FF',
		created_by: users[0].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: 2,
		name: '느그리그',
		description: 'A group for 느그리그 fans',
		color: '#FFA500',
		created_by: users[1].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: 3,
		name: 'Soccer Lovers',
		description: 'A group for soccer enthusiasts',
		color: '#008000',
		created_by: users[2].id,
		created_at: new Date(),
		updated_at: new Date()

	}
];

// GroupMembers Table
export const groupMembers = [
	{
		id: uuidv4(),
		group_id: groups[0].id,
		user_id: users[0].id,
		role: 'leader',
		joined_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[0].id,
		user_id: users[1].id,
		role: 'member',
		joined_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[0].id,
		user_id: users[3].id,
		role: 'member',
		joined_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[1].id,
		user_id: users[1].id,
		role: 'leader',
		joined_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[2].id,
		user_id: users[2].id,
		role: 'leader',
		joined_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[2].id,
		user_id: users[4].id,
		role: 'member',
		joined_at: new Date()
	}
];

// GroupJoinRequests Table
export const groupJoinRequests = [
    {
        id: uuidv4(),
        group_id: groups[0].id, // Basketball Enthusiasts
        user_id: users[5].id,   // Bob Davis
        requested_at: new Date()
    },
    {
        id: uuidv4(),
        group_id: groups[2].id, // Soccer Lovers
        user_id: users[1].id,   // Jane Smith
        requested_at: new Date()
    }
];

// Games Table
export const games = [
	{
		id: uuidv4(),
		group_id: groups[0].id,
		date_time: new Date('2024-08-15T06:00:00'),
		location: 'Provo, UT',
		created_by: users[0].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[2].id,
		date_time: new Date('2024-08-10T07:00:00'),
		location: 'Provo, UT',
		created_by: users[2].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[0].id,
		date_time: new Date('2024-08-05T21:00:00'),
		location: 'Provo, UT',
		created_by: users[3].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[1].id,
		date_time: new Date('2024-10-15T06:00:00'),
		location: 'Provo, UT',
		created_by: users[0].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[2].id,
		date_time: new Date('2024-10-18T07:00:00'),
		location: 'Salt Lake City, UT',
		created_by: users[2].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[0].id,
		date_time: new Date('2024-10-20T21:00:00'),
		location: 'Ogden, UT',
		created_by: users[3].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[0].id,
		date_time: new Date('2024-11-01T18:00:00'),
		location: 'Provo, UT',
		created_by: users[0].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[0].id,
		date_time: new Date('2024-10-05T19:00:00'),
		location: 'Provo, UT',
		created_by: users[3].id,
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		group_id: groups[0].id,
		date_time: new Date('2024-10-21T18:00:00'),
		location: 'Provo, UT',
		created_by: users[3].id,
		created_at: new Date(),
		updated_at: new Date()
	}
];

// GameAttendees Table
export const gameAttendees = [
	{
		id: uuidv4(),
		game_id: games[0].id,
		user_id: users[0].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[0].id,
		user_id: users[4].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[1].id,
		user_id: users[2].id,
		status: 'not_attending',
		checked_in: false,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[2].id,
		user_id: users[3].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[3].id,
		user_id: users[0].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[3].id,
		user_id: users[4].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[4].id,
		user_id: users[2].id,
		status: 'not_attending',
		checked_in: false,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[5].id,
		user_id: users[3].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[6].id,
		user_id: users[0].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[6].id,
		user_id: users[4].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[7].id,
		user_id: users[3].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	},
	{
		id: uuidv4(),
		game_id: games[7].id,
		user_id: users[4].id,
		status: 'attending',
		checked_in: true,
		updated_at: new Date()
	}
];
