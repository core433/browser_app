var cwd;
var filesys;
var navBar;
var mainFolder;

// $.ready is from jquery
$(document).ready(function() {

	navBar = document.getElementById('file_nav');
	mainFolder = document.getElementById('files_box');

	
	// store the entire json directory tree in var filesys
	filesys = JSON.parse($("#filesys_json").html());

	// store the current working path
	cwd = filesys;

	// for the file navigatinon bar, display all parent folders
	// as links, and current directory as text

	navBar.innerHTML = getNavBar();
	mainFolder.innerHTML = getFolderHTML();

});

function getNavBar()
{
	ret = "<a onclick='changeDirPath(\"/\")'>Home</a>";

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
				ret += " / <a onclick='changeDirPath(\"" + folder_path + "\")'>" + folders[i] + "</a>";
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

function changeDirPath(dirpath)
{
	var segments = dirpath.split("/");

	cur_path = filesys;

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

function getFolderHTML(){
	
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
		ret += "onclick='changeDirPath(\"" + folder.path +"\")'>";
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