namespace Facade {
    class Notify {
        send(template: string, to: string) {
            console.log(`Sending ${template} to ${to}`);
        }
    }
    
    class Log {
        log(message: string) {
            console.log(message);
        }
    }
    
    class Template {
        private templates = [
            { name: 'other', template: '<h1>Template!</h1>'}
        ];
    
        getByName(name: string) {
            return this.templates.find(t => t.name === name);
        }
    }
    
    class NotificationFacade {
        private notify: Notify;
        private logget: Log;
        private template: Template;
    
        constructor() {
            this.notify = new Notify();
            this.logget = new Log();
            this.template = new Template();
        }
    
        send(to: string, templateName: string): void {
            const data = this.template.getByName(templateName);
    
            if(!data) {
                this.logget.log('Template not found');
                return;
            }
            
            this.notify.send(data.template, to);
            this.logget.log('Template sended!');
        }
    }
    
    const facade = new NotificationFacade();
    facade.send('some api', 'other');
}
