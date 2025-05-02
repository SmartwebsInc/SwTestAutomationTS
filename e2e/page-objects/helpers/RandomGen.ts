
export interface IProfileAddress {
	address1: string;
	address2?: string;
	city: string;
	state: string;
	zip: string;
}

const streetNames = [
	'Peachtree St.', 'Marietta St.', 'Piedmont Ave.', 'Juniper St.', 'West Peachtree St.',
	'Spring St.', 'Northside Dr.', 'Memorial Dr.', 'Centennial Olympic Park Dr.', 'Edgewood Ave.',
];

const atlantaZipCodes = [
	'30301', '30302', '30303', '30304', '30305',
	'30306', '30307', '30308', '30309', '30310',
];

const firstNames = [
	'James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
	'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Andrew', 'Paul', 'Joshua',
	'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Jason', 'Edward', 'Jeffrey', 'Ryan',
	'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
	'Benjamin', 'Samuel', 'Gregory', 'Alexander', 'Patrick', 'Frank', 'Raymond', 'Jack', 'Dennis', 'Jerry',
	'Tyler', 'Aaron', 'Jose', 'Adam', 'Nathan', 'Henry', 'Zachary', 'Douglas', 'Peter', 'Kyle', 'Noah',
	'Ethan', 'Jeremy', 'Walter', 'Christian', 'Keith', 'Roger', 'Terry', 'Austin', 'Sean', 'Gerald',
	'Carl', 'Harold', 'Dylan', 'Arthur', 'Lawrence', 'Jordan', 'Jesse', 'Bryan', 'Billy', 'Bruce',
	'Gabriel', 'Joe', 'Logan', 'Alan', 'Juan', 'Albert', 'Willie', 'Elijah', 'Wayne', 'Randy',
	'Vincent', 'Mason', 'Roy', 'Ralph', 'Bobby', 'Russell', 'Bradley', 'Philip', 'Eugene',
	'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
	'Lisa', 'Nancy', 'Betty', 'Sandra', 'Margaret', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
	'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Dorothy', 'Rebecca', 'Sharon', 'Laura', 'Cynthia',
	'Amy', 'Kathleen', 'Angela', 'Shirley', 'Brenda', 'Emma', 'Anna', 'Pamela', 'Nicole', 'Samantha',
	'Katherine', 'Christine', 'Helen', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Maria', 'Catherine', 'Heather',
	'Diane', 'Olivia', 'Julie', 'Joyce', 'Victoria', 'Ruth', 'Virginia', 'Lauren', 'Kelly', 'Christina',
	'Joan', 'Evelyn', 'Judith', 'Andrea', 'Hannah', 'Megan', 'Cheryl', 'Jacqueline', 'Martha', 'Madison',
	'Teresa', 'Gloria', 'Sara', 'Janice', 'Ann', 'Kathryn', 'Abigail', 'Sophia', 'Frances', 'Jean',
	'Alice', 'Judy', 'Isabella', 'Julia', 'Grace', 'Amber', 'Denise', 'Danielle', 'Marilyn', 'Beverly',
	'Charlotte', 'Natalie', 'Theresa', 'Diana', 'Brittany', 'Doris', 'Kayla', 'Alexis', 'Lori', 'Marie', 'Jane',
	'Nikki', 'Ariel', 'Mark', 'Tyler',
];

const lastNames = [
	'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
	'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
	'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
	'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
	'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
	'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
	'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
	'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
	'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
	'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez',
	'Powell', 'Jenkins', 'Perry', 'Russell', 'Sullivan', 'Bell', 'Coleman', 'Butler', 'Henderson', 'Barnes',
	'Gonzales', 'Fisher', 'Vasquez', 'Simmons', 'Romero', 'Jordan', 'Patterson', 'Alexander', 'Hamilton', 'Graham',
	'Reynolds', 'Griffin', 'Wallace', 'Moreno', 'West', 'Cole', 'Hayes', 'Bryant', 'Herrera', 'Gibson',
	'Ellis', 'Tran', 'Medina', 'Aguilar', 'Stevens', 'Murray', 'Ford', 'Castro', 'Marshall', 'Owens',
	'Harrison', 'Fernandez', 'McDonald', 'Woods', 'Washington', 'Kennedy', 'Wells', 'Vargas', 'Henry', 'Chen',
	'Freeman', 'Webb', 'Tucker', 'Guzman', 'Burns', 'Crawford', 'Olson', 'Simpson', 'Porter', 'Hunter',
	'Gordon', 'Mendez', 'Silva', 'Shaw', 'Snyder', 'Mason', 'Dixon', 'Munoz', 'Hunt', 'Hicks',
	'Holmes', 'Palmer', 'Wagner', 'Black', 'Robertson', 'Boyd', 'Rose', 'Stone', 'Salazar', 'Fox',
	'Warren', 'Mills', 'Meyer', 'Rice', 'Schmidt', 'Garza', 'Daniels', 'Ferguson', 'Nichols', 'Stephens',
	'Soto', 'Weaver', 'Ryan', 'Gardner', 'Payne', 'Grant', 'Dunn', 'Kelley', 'Spencer', 'Hawkins',
];

export class randomGen {
	readonly rand: number;
	readonly userEmail: string;
	readonly userName: string;
	private Address: IProfileAddress;
	readonly userPhoneNumber: string;
	readonly associationName: string;
	readonly firstName: string;
	readonly lastName: string;

	constructor() {
		this.rand = Math.floor(Math.random() * 1000000);
		this.userEmail = 'testemailSW+' + this.rand + '@gmail.com';
		this.firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
		this.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
		this.userName = this.firstName.charAt(0) + this.lastName;
		this.Address = this.generateRandomAddress();
		this.userPhoneNumber = String(Math.floor(Math.random() * (9999999999 - 2000000000) + 2000000000));
		this.associationName = 'HOA ' + this.rand;
	}

	random() {
		return Math.floor(Math.random() * 1000000);
	}

	generateRandomString(length: number) {
		return Array.from({ length: length }, function () {
			return Math.random().toString(36).charAt(2);
		}).join('');
	}

	generateRandomNumberInARange(from: number, to: number) {
		return Math.floor(Math.random() * (to - from) + from);
	}

	generateRandomAddress(): IProfileAddress {
		const streetNumber = this.generateRandomNumberInARange(1, 2000);
		const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
		const zipcode = atlantaZipCodes[Math.floor(Math.random() * atlantaZipCodes.length)];

		const address: IProfileAddress = {
			address1: `${streetNumber} ${streetName}`,
			address2: '',
			city: 'Atlanta',
			state: 'GA',
			zip: zipcode,
		};
		return address;
	}
}