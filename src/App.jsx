import React from "react";

class Tasks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibility: {
				hr: "undisplayed",
			},
		};
		this.removeTask = this.removeTask.bind(this);
		this.checkOffTask = this.checkOffTask.bind(this);
	}

	removeTask(e) {
		const doneTasks = document.querySelector(".done-tasks");
		const undoneTasks = document.querySelector(".undone-tasks");

		document
			.querySelector(`.${e.target.parentNode.parentNode.parentNode.className}`)
			.removeChild(e.target.parentNode.parentNode);

		if (!undoneTasks.hasChildNodes() || !doneTasks.hasChildNodes()) {
			this.setState((prevState) => ({
				visibility: {
					...prevState.visibility,
					hr: "undisplayed",
				},
			}));
		}
	}

	checkOffTask(e) {
		const doneTasks = document.querySelector(".done-tasks");
		const undoneTasks = document.querySelector(".undone-tasks");

		const classesToToggle = ["fa-circle", "fa-solid", "fa-regular", "fa-check"];
		e.target.parentNode.parentNode.children[0].classList.toggle("crossedOut");
		for (let i = 0; i < classesToToggle.length; i++) {
			e.target.classList.toggle(classesToToggle[i]);
		}

		if (
			e.target.parentNode.parentNode.parentNode.className === "undone-tasks"
		) {
			doneTasks.appendChild(e.target.parentNode.parentNode);
		} else {
			undoneTasks.appendChild(e.target.parentNode.parentNode);
		}

		if (doneTasks.hasChildNodes() && undoneTasks.hasChildNodes()) {
			this.setState((prevState) => ({
				visibility: {
					...prevState.visibility,
					hr: "displayed",
				},
			}));
		} else {
			this.setState((prevState) => ({
				visibility: {
					...prevState.visibility,
					hr: "undisplayed",
				},
			}));
		}
	}

	render() {
		const tasks = this.props.tasks.map((task, i) => {
			return (
				<li id={`task-no-${i + 1}`}>
					<span>{task}</span>
					<div>
						<i
							className="fa-regular fa-lg fa-circle"
							onClick={this.checkOffTask}></i>
						<i className="fa-solid fa-trash-can" onClick={this.removeTask}></i>
					</div>
				</li>
			);
		});

		return (
			<section className="tasks">
				<ul className="undone-tasks">{tasks}</ul>
				<hr className={this.state.visibility.hr} />
				<ul className="done-tasks"></ul>
			</section>
		);
	}
}

export { Tasks };
