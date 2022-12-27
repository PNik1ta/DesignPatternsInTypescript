namespace Bridge {
    /**
     * Represents provider interface for pseudo message provide logic
     * @function sendMessage - pseudo send message function
     * @function connect - pseudo function for connecting to messenger
     * @function sendMessage - pseudo function for disconnecting from messenger
     */
    interface IProvider {
        sendMessage(message: string): void;
        connect(config: unknown): void;
        disconnect(): void;
    }

    class TelegramProvider implements IProvider {
        sendMessage(message: string): void {
            console.log(message);
        }
        connect(config: string): void {
            console.log(config);
        }
        disconnect(): void {
            console.log('Disconnected telegram');
        }
    }

    class WhatsappProvider implements IProvider {
        sendMessage(message: string): void {
            console.log(message);
        }
        connect(config: string): void {
            console.log(config);
        }
        disconnect(): void {
            console.log('Disconnected whatsapp');
        }
    }

    class NotificationSender {
        constructor(private provider: IProvider) { }

        send() {
            this.provider.connect('connect');
            this.provider.sendMessage('message');
            this.provider.disconnect();
        }
    }

    class DelayNotificationSender extends NotificationSender {
        constructor(provider: IProvider) {
            super(provider);
        }

        sendDelayed() {

        }
    }

    const sender = new NotificationSender(new TelegramProvider());
    sender.send();

    const sender2 = new NotificationSender(new WhatsappProvider());
    sender2.send();
}

