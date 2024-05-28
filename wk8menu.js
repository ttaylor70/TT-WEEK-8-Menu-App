//This code is like what was shown in this weeks video which included teams and players. I chose to use an app for a Triathlon which has athletses and different division depending on the distance of the race, like Olympic or Sprint. That meant I needed to add a new constructor called division so that it could designate if the team was in that particular division.

class Athlete {
  constructor(name, leg) {
    this.name = name;
    this.leg = leg; // swim, bike, or run
  }

  describe() {
    return `${this.name} is responsible for ${this.leg}.`;
  }
}

class Team {
  constructor(name, division) {
    this.name = name;
    this.division = division; // Olympic or Sprint
    this.athletes = [];
  }

  //Here i specified that a team can only have 3 athletes. I tested th app and tried to add a 4th name and the app crashed. I wanted it to say only 3 athletes allowed.

  addAthlete(athlete) {
    if (athlete instanceof Athlete) {
      if (this.athletes.length < 3) {
        this.athletes.push(athlete);
      } else {
        throw new Error(`A team can only have 3 athletes.`);
      }
    } else {
      throw new Error(
        `You can only add an instance of Athlete. Argument is not an athlete: ${athlete}`
      );
    }
  }

  describe() {
    return `${this.name} (${this.division}) has ${this.athletes.length} athletes.`;
  }
}

//the Menu class includes an array.

class Menu {
  constructor() {
    this.teams = [];
    this.selectedTeam = null;
  }

  start() {
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createTeam();
          break;
        case "2":
          this.viewTeam();
          break;
        case "3":
          this.deleteTeam();
          break;
        case "4":
          this.displayTeams();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    // Rather than exsiting at Goodbye, I gave user a choice between "Goodbye" and "Start Over"
    let restart = confirm("Goodbye! Do you want to start over?");
    if (restart) {
      this.start();
    } else {
      alert("Goodbye!");
    }
  }

  showMainMenuOptions() {
    return prompt(`
        0) exit
        1) create new team
        2) view team
        3) delete team
        4) display all teams
      `);
  }

  showTeamMenuOptions(teamInfo) {
    return prompt(`
        0) back
        1) create athlete
        2) delete athlete
        ------------------
        ${teamInfo}
      `);
  }

  displayTeams() {
    let teamsString = "";
    for (let i = 0; i < this.teams.length; i++) {
      teamsString +=
        i + ") " + this.teams[i].name + " (" + this.teams[i].division + ")\n";
    }
    if (teamsString === "") {
      teamsString = "No teams available.";
    }
    alert(teamsString);
  }

  createTeam() {
    let name = prompt("Enter new team name:");
    if (name === null || name.trim() === "") {
      alert("Team name cannot be empty.");
      return;
    }

    let division = prompt("Specify race for new team (Olympic or Sprint):");
    if (
      division === null ||
      (division.toLowerCase() !== "olympic" &&
        division.toLowerCase() !== "sprint")
    ) {
      alert("Invalid division. Please enter 'Olympic' or 'Sprint'.");
      return;
    }

    this.teams.push(
      new Team(
        name,
        division.charAt(0).toUpperCase() + division.slice(1).toLowerCase()
      )
    );
  }

  //The isNaN function checks if the converted index is NaN (Not-a-Number). This can happen if the user enters a non-numeric value. The selectedTeam is set to the team at the specified index. A description of the team and its athletes is built. The `showTeam MenuOptions` method is called to display the team details and prodive options for creating or deleting athletes.
  viewTeam() {
    let index = prompt("Enter the index of the team you wish to view:");
    index = parseInt(index); // Ensure the index is an integer
    if (isNaN(index) || index < 0 || index >= this.teams.length) {
      alert("Invalid team index.");
      return;
    }

    this.selectedTeam = this.teams[index];
    let description =
      "Team Name: " +
      this.selectedTeam.name +
      " (" +
      this.selectedTeam.division +
      ")\n";

    for (let i = 0; i < this.selectedTeam.athletes.length; i++) {
      description += i + ") " + this.selectedTeam.athletes[i].describe() + "\n";
    }

    let selection = this.showTeamMenuOptions(description);
    switch (selection) {
      case "1":
        this.createAthlete();
        break;
      case "2":
        this.deleteAthlete();
    }
  }

  createAthlete() {
    let name = prompt("Enter name for new athlete:");
    if (name === null || name.trim() === "") {
      alert("Athlete name cannot be empty.");
      return;
    }

    // A triathlon has "legs" to the race. Each athlete will either swim, bike or run. When entering an athlete name the app asks which leg of the race the athlete will be responsioble for.

    let leg = prompt("Enter leg for new athlete (swim/bike/run):");
    if (
      leg === null ||
      (leg.toLowerCase() !== "swim" &&
        leg.toLowerCase() !== "bike" &&
        leg.toLowerCase() !== "run")
    ) {
      alert("Invalid leg. Please enter 'swim', 'bike', or 'run'.");
      return;
    }

    try {
      this.selectedTeam.addAthlete(
        new Athlete(
          name,
          leg.charAt(0).toUpperCase() + leg.slice(1).toLowerCase()
        )
      );
    } catch (error) {
      alert(error.message);
    }
  }

  deleteAthlete() {
    let index = prompt("Enter the index of the athlete you wish to delete:");
    index = parseInt(index); // Ensure the index is an integer
    if (
      isNaN(index) ||
      index < 0 ||
      index >= this.selectedTeam.athletes.length
    ) {
      alert("Invalid athlete index.");
      return;
    }

    this.selectedTeam.athletes.splice(index, 1);
  }

  deleteTeam() {
    let index = prompt("Enter the index of the team you wish to delete:");
    index = parseInt(index); // Ensure the index is an integer
    if (isNaN(index) || index < 0 || index >= this.teams.length) {
      alert("Invalid team index.");
      return;
    }

    this.teams.splice(index, 1);
  }
}

let menu = new Menu();
menu.start();
