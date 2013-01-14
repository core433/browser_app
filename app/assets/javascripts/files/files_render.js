var cwd;
var filesys;
var navBar;
var mainFolder;

var backHistory;
var fwdHistory;

// $.ready is from jquery
$(document).ready(function() {

	navBar = document.getElementById('file_nav');
	mainFolder = document.getElementById('files_box');
	toolbar = document.getElementById('toolbar');

	backHistory = [];
	fwdHistory = [];

	
	// store the entire json directory tree in var filesys
	filesys = JSON.parse($("#filesys_json").html());

	// store the current working path
	cwd = filesys;

	// for the file navigatinon bar, display all parent folders
	// as links, and current directory as text

	navBar.innerHTML = getNavBar();
	mainFolder.innerHTML = getFolderHTML();
	toolbar.innerHTML = getToolbarHTML();

});

function getNavBar()
{
	ret = "<a onclick='changeDirPath(\"/\", true)'>Home</a>";

	var folders = cwd.path.split("/");
	//alert(folders);

	var folder_path = "";

	for (var i = 0; i < folders.length; i++)
	{
		if (folders[i].length > 0 )
		{
			if (i < folders.length - 1)
			{
				folder_path += "/"+folders[i];
				ret += " / <a onclick='changeDirPath(\"" + folder_path + "\", true)'>" + folders[i] + "</a>";
			}
			else
			{
				// the last element is not a link
				ret += " / " + folders[i];
			}
		}
	}

	return ret;

}

// change to display @dirpath
// @storeHistory is a bool that determines whether to store
// the navigation history for back functionality.  For instance,
// if we're calling changeDirPath from the goBack() function,
// do not want to store the history, otherwise will end up in
// closed loop of going back
function changeDirPath(dirpath, storeHistory)
{
	// first store the cwd path into backHistory so we can
	// backtrack using the back button
	if (storeHistory)
	{
		backHistory.push(cwd.path);
	}

	var segments = dirpath.split("/");

	var cur_path = filesys;

	for (var i = 0; i < segments.length; i++)
	{
		var dir_index = 0;
		dirname = segments[i];
		if (segments[i].length > 0)
		{
			for (var j = 0; j < cur_path.children.length; j++)
			{
				if (cur_path.children[j].name == dirname)
				{
					dir_index = j;
					break;
				}
			}

			cur_path = cur_path.children[dir_index];
		}
	}

	cwd = cur_path;
	navBar.innerHTML = getNavBar();
	mainFolder.innerHTML = getFolderHTML();
}

function changeDir(dirname)
{
	var dir_index = 0;

	for (var i = 0; i < cwd.children.length; i++)
	{
		if (cwd.children[i].name == dirname)
		{
			dir_index = i;
			//alert(dir_index);
			break;
		}
	}

	cwd = cwd.children[dir_index];

	navBar.innerHTML = getNavBar();
	//alert("change dir to " + path_str+dirname);
	
	
	//alert(cwd.name);

	mainFolder.innerHTML = getFolderHTML();

}

function getFolderHTML()
{
	
	//alert('getfolderhtml');

	ret = "";

	folders = [];
	files = [];

	for (var i = 0; i < cwd.children.length; i++)
	{
		child = cwd.children[i];
		if (child.type == "file")
		{
			files.push(child);
		}
		else if (child.type == "folder")
		{
			folders.push(child);
		}
	}

	for (var i = 0; i < folders.length; i++)
	{
		folder = folders[i];

		ret += "<div class='folder' "
		//ret += "onclick='changeDir(\"" + folder.name +"\")'>";
		ret += "onclick='changeDirPath(\"" + folder.path +"\", true)'>";
		ret += "<h1>" + folder.name + "</hi></div>";
	}

	for (var i = 0; i < files.length; i++)
	{
		file = files[i];
		ret += "<div class='file'>";
		ret += "<h1>" + file.name + "</hi></div>";
	}

	return ret;

}

function goBack()
{
	if (backHistory.length == 0)
	{
		return;
	}
	else
	{
		fwdHistory.push(cwd.path);
		changeDirPath(backHistory.pop(), false)
	}
}

function goFwd()
{
	if (fwdHistory.length == 0)
	{
		return;
	}
	else
	{
		changeDirPath(fwdHistory.pop(), true)
	}
}

function getToolbarHTML()
{
	ret = "<a onclick='goBack()'>Back</a>";
	ret += " <a onclick='goFwd()'>Fwd</a>";

	return ret;

}


