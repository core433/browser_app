module ApplicationHelper

	# Returns the full title on a per-page basis
	def full_title(page_title)
		base_title = "Mobifly"
		if (page_title.empty?)
			base_title
		else
			"#{base_title} | #{page_title}"
		end
	end

	def current_uri
		request.env['PATH_INFO']
	end

end
