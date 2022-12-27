namespace FactoryMethod {
    /**
     * Represents an insurance interface 
     * @param {number} id - pseudo id of insurance
     * @param {string} status- pseudo status of insurance
     */
    interface IInsurance {
        id: number;
        status: string;
        setVehicle(vehicle: any): void;
        submit(): Promise<boolean>;
    }

    /**
     * Represents realization of insurance interface for pseudo insurance company logic
     * @function submit - pseudo API request for insurance
     */
    class TFInsurance implements IInsurance {
        id: number;
        status: string;
        private vehicle: any;

        constructor(id: number, status: string) {
            this.id = id;
            this.status = status;
        }

        setVehicle(vehicle: any): void {
            this.vehicle = vehicle;
        }

        async submit(): Promise<boolean> {
            const res = await fetch('', { method: 'POST', body: JSON.stringify({ vehicle: this.vehicle }) });
            const data = await res.json();
            return data.isSuccess;
        }
    }

    /**
     * Represents realization of insurance interface for pseudo insurance company logic
     * @function submit - pseudo API request for insurance
     */
    class ABInsurance implements IInsurance {
        id: number;
        status: string;
        private vehicle: any;

        constructor(id: number, status: string) {
            this.id = id;
            this.status = status;
        }

        setVehicle(vehicle: any): void {
            this.vehicle = vehicle;
        }

        async submit(): Promise<boolean> {
            const res = await fetch('ab', { method: 'POST', body: JSON.stringify({ vehicle: this.vehicle }) });
            const data = await res.json();
            return data.isSuccess;
        }
    }


    //FACTORY --------------------------------------------------------------
    abstract class InsuranceFactory {
        db: any;
        abstract createInsurance(): IInsurance;

        saveHistory(ins: IInsurance) {
            this.db.save(ins.id, ins.status);
        }
    }

    class TFInsuranceFactory extends InsuranceFactory {
        createInsurance(): IInsurance {
            return new TFInsurance(0, '');
        }
    }

    class ABInsuranceFactory extends InsuranceFactory {
        createInsurance(): IInsurance {
            return new ABInsurance(0, '');
        }
    }

    //USAGE --------------------------------------------------------------
    const tfInsuranceFactory = new TFInsuranceFactory();
    const ins = tfInsuranceFactory.createInsurance();
    tfInsuranceFactory.saveHistory(ins);


    //ALTERNATIVE REALIZATION OF FACTORY --------------------------------------------------------------
    const INSURANCE_TYPE = {
        tf: TFInsurance,
        ab: ABInsurance
    }

    type IT = typeof INSURANCE_TYPE;

    class InsuranceFactoryAlternative {
        db: any;

        createInsurance<T extends keyof IT>(type: T): IT[T] {
            return INSURANCE_TYPE[type];
        }

        saveHistory(ins: IInsurance) {
            this.db.save(ins.id, ins.status);
        }
    }

    const insuranceFactoryAlternative = new InsuranceFactoryAlternative();
    const ins2 = new (insuranceFactoryAlternative.createInsurance('tf'))(0, '');
    insuranceFactoryAlternative.saveHistory(ins2);
}

