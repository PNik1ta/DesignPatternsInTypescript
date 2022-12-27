namespace State {
	class DocumentItem {
		public text: string;
		private state: DocumentItemState;

		getState(): DocumentItemState {
			return this.state;
		}

		setState(state: DocumentItemState) {
			this.state = state;
			this.state.setContext(this);
		}

		publishDoc() {
			this.state.publish();
		}

		deleteDoc() {
			this.state.delete();
		}

		constructor() {
			this.state = new DraftDocumentItemState();
			this.text = '';
		}
	}

	abstract class DocumentItemState {
		public name: string;
		public item: DocumentItem;

		constructor() {
			this.name = '';
			this.item = new DocumentItem();
		}

		public setContext(item: DocumentItem) {
			this.item = item;
		}

		public abstract publish(): void;
		public abstract delete(): void;
	}

	class DraftDocumentItemState extends DocumentItemState {
		constructor() {
			super();
			this.name = 'DraftDocument';
		}

		public publish(): void {
			console.log(`Sended text ${this.item.text}`);		
			this.item.setState(new PublishDocumentItemState());
		}

		public delete(): void {
			console.log('Document deleted');
		}
	}

	class PublishDocumentItemState extends DocumentItemState {
		constructor() {
			super();
			this.name = 'PublishDocument';
		}

		public publish(): void {
			console.log("Can't publish published document");
		}

		public delete(): void {
			console.log('Removed from published');
			this.item.setState(new DraftDocumentItemState());
		}
	}

	const item = new DocumentItem();
	item.text = 'My post';
	console.log(item.getState());
	item.publishDoc();
	console.log(item.getState());
	item.deleteDoc();
	console.log(item.getState());
}

