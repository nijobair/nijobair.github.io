module Jekyll
  module NumericSortFilter
    def numeric_sort(files)
      files.sort_by do |file|
        match_data = file[0].match(/challenge(\d+)\.json/)
        match_data ? match_data[1].to_i : Float::INFINITY
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::NumericSortFilter)