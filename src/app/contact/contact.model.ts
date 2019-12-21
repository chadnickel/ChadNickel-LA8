interface Icontact {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    editing?: boolean;

}



export class Contact {


    public id?: number;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public phone?: string;
    public editing?: boolean;

    constructor(contact: Icontact) {
        contact.editing = this.setState(contact);
        Object.assign(this, contact);


    }

    setState(contact: Icontact) {

        if (contact == null || Object.keys(contact).length == 0) {
            return true;
        }

        let editing = false;
        Object.keys(contact).forEach((key) => {
            console.log('from setstate...', contact[key]);
            if (contact[key] == null) {
                editing = true;
            }
        });
        return true;

    }
}