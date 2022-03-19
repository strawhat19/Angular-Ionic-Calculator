interface User {
  email: any;
  username: any;
  password: any;
  job: any;
  company: any;
  stats: any;
  bills: any;
}

class User {
  constructor(email, username, password, job, company, stats, bills) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.job = job;
    this.company = company;
    this.stats = stats;
    this.bills = bills;
  }
}

export default User
