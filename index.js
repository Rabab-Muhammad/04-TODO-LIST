#! usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
console.log(chalk.magenta.bold("\n \t Welcome to - TODO-LIST APPLICATION\n"));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.green("Please select an option you want:"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"]
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View Todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            condition = false;
        }
    }
};
//function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.green("Enter your new task :")
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.blue(`\n ${newTask.task} task added to Todo-List sucessfully\n`));
};
//function to view all Todo list task
let viewTask = () => {
    console.log("\n Your Todo-List: \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
//function to delete a task from list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.green("Enter the 'index no.' of the task you want to delete :")
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.blue(`\n ${deletedTask} this task has been deleted sucessfully from your Todo-List\n`));
};
//function to update a task
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.green("Enter the 'index no' of the task you want to update :")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.green("Now Enter new task name :")
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(chalk.blue(`\n Task at index no. ${update_task_index.index - 1} updated sucessfully [For updated list check option: "view Todo-List]`));
};
main();
