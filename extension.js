const vscode = require('vscode')

let startup_time

function round_number(value, decimals)
{
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals)
}

function show_time_ago()
{
	let s = ""
	let d = Date.now() - startup_time
	let minutes = d / 1000 / 60
	let hours = round_number(minutes / 60, 2)

	if(minutes < 2)
	{
		s = "Just Now"
	}

	else if(hours < 1)
	{
		s = `${Math.round(minutes)} minutes ago`
	}

	else if(hours >= 1)
	{
		let h = parseInt(hours)
		let m = round_number(hours - h, 2)

		if(h === 1)
		{
			s = "1 hour"
		}

		else
		{
			s = `${h} hours`
		}

		if(hours > h)
		{
			let n = parseInt(60 * m)

			if(n > 0)
			{
				if(n === 1)
				{
					s += ` and ${n} minute ago`
				}
	
				else
				{
					s += ` and ${n} minutes ago`
				}
			}
		}

		else
		{
			s += " ago"
		}
	}

	vscode.window.showInformationMessage(s)
}

function activate(context) 
{
	startup_time = Date.now()

	let disposable = vscode.commands.registerCommand('extension.when', function() 
	{
		show_time_ago()
	})

	context.subscriptions.push(disposable)
}

exports.activate = activate

function deactivate() {}

module.exports = 
{
	activate,
	deactivate
}
