module Jekyll
  module NumericSortFilter
    def numeric_sort(files)
      files.sort_by { |file| file[0].match(/challenge(\d+)/)[1].to_i }
    end
  end
end

Liquid::Template.register_filter(Jekyll::NumericSortFilter)