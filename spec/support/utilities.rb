# Returns the full title on a per-page basis
def full_title(page_title)
	base_title = "Daniel Chang's Browser App"
	if (page_title.empty?)
		base_title
	else
		"#{base_title} | #{page_title}"
	end
end

def sign_in(user)
	visit signin_path
	fill_in "Email", with: user.email
	fill_in "Password", with: user.password
	click_button "Sign in"
	cookies[:remember_token] = user.remember_token
end
