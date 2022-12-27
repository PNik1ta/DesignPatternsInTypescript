namespace Command {
	class User {
		constructor(public userId: number) {}
	}

	class UserService {
		saveUser(user: User) {
			console.log(`Saving user with id ${user.userId}`);
		}

		deleteUser(userId: number) {
			console.log(`Deleting user with id ${userId}`);
		}
	}

	abstract class Command {
		public commandId: number;

		abstract execute(): void;

		constructor(public history: CommandHistory) {
			this.commandId = Math.random();
		}
	}

	class CommandHistory {
		public commands: Command[] = [];
		push(command: Command) {
			this.commands.push(command);
		}
		remove(command: Command) {
			this.commands = this.commands.filter(c => c.commandId !== command.commandId);
		}
	}

	class AddUserCommand extends Command {
		constructor(
			private user: User, 
			private receiver: UserService, 
			history: CommandHistory
		) {
			super(history);
		}

		execute(): void {
			this.receiver.saveUser(this.user);
			this.history.push(this);
		}

		undo(): void {
			this.receiver.deleteUser(this.user.userId);
			this.history.remove(this);
		}
	}

	class Controller {
		receiver: UserService = new UserService();
		history: CommandHistory = new CommandHistory();

		addReceiver(receiver: UserService) {
			this.receiver = receiver;
		}

		run() {
			const addUserCommand = new AddUserCommand(
				new User(1),
				this.receiver,
				this.history
			);
			addUserCommand.execute();
			console.log(addUserCommand.history);
			addUserCommand.undo();
			console.log(addUserCommand.history);
		}
	}

	const controller = new Controller();
	controller.addReceiver(new UserService());
	controller.run();
}

