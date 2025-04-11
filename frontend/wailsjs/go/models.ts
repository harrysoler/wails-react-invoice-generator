export namespace caching {
	
	export class OrderFilter {
	    FullTextSearch: string;
	    Platforms: string[];
	    Cities: string[];
	
	    static createFrom(source: any = {}) {
	        return new OrderFilter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.FullTextSearch = source["FullTextSearch"];
	        this.Platforms = source["Platforms"];
	        this.Cities = source["Cities"];
	    }
	}

}

export namespace domain {
	
	export class Product {
	    Name: string;
	    Quantity: number;
	
	    static createFrom(source: any = {}) {
	        return new Product(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Quantity = source["Quantity"];
	    }
	}
	export class Order {
	    OdooReference: string;
	    ClientReference: string;
	    ClientName: string;
	    PlatformName: string;
	    Address: string;
	    City: string;
	    PhoneNumber: string;
	    Products: Product[];
	
	    static createFrom(source: any = {}) {
	        return new Order(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.OdooReference = source["OdooReference"];
	        this.ClientReference = source["ClientReference"];
	        this.ClientName = source["ClientName"];
	        this.PlatformName = source["PlatformName"];
	        this.Address = source["Address"];
	        this.City = source["City"];
	        this.PhoneNumber = source["PhoneNumber"];
	        this.Products = this.convertValues(source["Products"], Product);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

