crystal_doc_search_index_callback({"repository_name":"csuuid","body":"# CSSUID\n\n![CSUUID CI](https://img.shields.io/github/workflow/status/wyhaines/CSUUID.cr/CSUUID.cr%20CI?style=for-the-badge&logo=GitHub)\n[![GitHub release](https://img.shields.io/github/release/wyhaines/CSUUID.cr.svg?style=for-the-badge)](https://github.com/wyhaines/CSUUID.cr/releases)\n![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/wyhaines/CSUUID.cr/latest?style=for-the-badge)\n\nThis struct wraps up a UUID that encodes a timestamp measured as seconds from the epoch `(0001-01-01 00:00:00.0 UTC)` observed at the location where the timestamp was generated, plus nanoseconds in the current second, plus 6 bytes for unique identification of the source -- this could be an IPV4 address with two null bytes, a MAC address, or some other sequence that will fit in 6 bytes.\n  \nNanoseconds will fit in an Int32 (4 bytes), but seconds since the epoch will not. The current number of seconds leaks a short distance into a 5th byte, meaning that in this class, it has to be represented by an Int64. This is problematic because a UID allows for 16 bytes, so the use of 8 for seconds and 4 for nanoseconds leaves only 4 bytes for system identification. It also leaves three bytes in the UUID as zeros because 8 bytes for seconds is a lot of seconds.\n    \nOne solution is to combine the seconds and the nanoseconds into a single Int64 number. This requires math operations to do efficiently:\n\n```\n(seconds * 1000000000) + nanoseconds\n```\n\nand then more math to extract the original numbers in order to reconstruct the original timestamp. This leaves 8 bytes for identification or other uniqueness information, which is lovely, but the math requirement is less lovely.\n  \nThe other options is to truncate 2 bytes off of the seconds, storing 6 bytes of seconds data. This leaves 6 bytes for identification.\n    \nThe current implementation chose option #2, as it is less work to generate a UUID if math is not involved.\n\n``` \n+-------------+-----------------+------------+\n| nanoseconds |     seconds     | identifier |\n|    0..3     |      4..10      |   11..15   |\n+-------------+-----------------+------------+\n```\n\n## Installation\n\n1. Add the dependency to your `shard.yml`:\n\n   ```yaml\n   dependencies:\n     cssuid:\n       github: wyhaines/cssuid\n   ```\n\n2. Run `shards install`\n\n## Usage\n\n```crystal\nrequire \"cssuid\"\n\nuuid = CSUUID.new\n\nuuid = CSUUID.new(seconds: 9223372036, nanoseconds: 729262400)\n\ndt = ParseDate.parse(\"2020/07/29 09:15:37\")\nuuid = CSUUID.new(dt)\n```\n\n## Contributing\n\n1. Fork it (<https://github.com/wyhaines/parsedate/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [Kirk Haines](https://github.com/wyhaines) - creator and maintainer\n\n![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wyhaines/CSUUID.cr?style=for-the-badge)\n![GitHub issues](https://img.shields.io/github/issues/wyhaines/CSUUID.cr?style=for-the-badge)","program":{"html_id":"csuuid/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"csuuid","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"csuuid/CSUUID","path":"CSUUID.html","kind":"struct","full_name":"CSUUID","name":"CSUUID","abstract":false,"superclass":{"html_id":"csuuid/Struct","kind":"struct","full_name":"Struct","name":"Struct"},"ancestors":[{"html_id":"csuuid/Struct","kind":"struct","full_name":"Struct","name":"Struct"},{"html_id":"csuuid/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"csuuid/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/csuuid.cr","line_number":42,"url":null}],"repository_name":"csuuid","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.1.1\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"This struct wraps up a UUID that encodes a timestamp measured as seconds\nfrom the epoch (0001-01-01 00:00:00.0 UTC) observed at the location where\nthe timestamp was generated, plus nanoseconds in the current second, plus\n6 bytes for unique identification of the source -- this could be an\nIPV4 address with two null bytes, a MAC address, or some other sequence\nthat will fit in 6 bytes.\n\nNanoseconds will fit in an Int32 (4 bytes), but seconds since the epoch\nwill not. The current number of seconds leaks a short distance into a\n5th byte, meaning that in this class, it has to be represented by an\nInt64. This is problematic because a UID allows for 16 bytes, so the\nuse of 8 for seconds and 4 for nanoseconds leaves only 4 bytes for system\nidentification. It also leaves three bytes in the UUID as zeros because 8\nbytes for seconds is a lot of seconds.\n\nOne solution is to combine the seconds and the nanoseconds into a single\nInt64 number. This requires math operations to do efficiently:\n    (seconds * 1000000000) + nanoseconds\nand then more math to extract the original numbers in order to reconstruct\nthe original timestamp. This leaves 8 bytes for identification or other\nuniqueness information, which is lovely, but the math requirement is less\nlovely.\n\nThe other options is to truncate 2 bytes off of the seconds, storing\n6 bytes of seconds data. This leaves 6 bytes for identification.\n\nThe current implementation chose option #2, as it is less work to generate\na UUID if math is not involved.\n\n```plain\n+-------------+-----------------+------------+\n| nanoseconds |     seconds     | identifier |\n|    0..3     |      4..10      |   11..15   |\n+-------------+-----------------+------------+\n```\n","summary":"<p>This struct wraps up a UUID that encodes a timestamp measured as seconds from the epoch (0001-01-01 00:00:00.0 UTC) observed at the location where the timestamp was generated, plus nanoseconds in the current second, plus 6 bytes for unique identification of the source -- this could be an IPV4 address with two null bytes, a MAC address, or some other sequence that will fit in 6 bytes.</p>","class_methods":[],"constructors":[{"id":"new(seconds:Int64,nanoseconds:Int32,identifier:Slice(UInt8)|String|Nil=nil)-class-method","html_id":"new(seconds:Int64,nanoseconds:Int32,identifier:Slice(UInt8)|String|Nil=nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"seconds","doc":null,"default_value":"","external_name":"seconds","restriction":"Int64"},{"name":"nanoseconds","doc":null,"default_value":"","external_name":"nanoseconds","restriction":"Int32"},{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"args_string":"(seconds : Int64, nanoseconds : Int32, identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","args_html":"(seconds : Int64, nanoseconds : Int32, identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","location":{"filename":"src/csuuid.cr","line_number":68,"url":null},"def":{"name":"new","args":[{"name":"seconds","doc":null,"default_value":"","external_name":"seconds","restriction":"Int64"},{"name":"nanoseconds","doc":null,"default_value":"","external_name":"nanoseconds","restriction":"Int32"},{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(seconds, nanoseconds, identifier)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(uuid:String)-class-method","html_id":"new(uuid:String)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"uuid","doc":null,"default_value":"","external_name":"uuid","restriction":"String"}],"args_string":"(uuid : String)","args_html":"(uuid : String)","location":{"filename":"src/csuuid.cr","line_number":60,"url":null},"def":{"name":"new","args":[{"name":"uuid","doc":null,"default_value":"","external_name":"uuid","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(uuid)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(uuid:UUID|CSUUID)-class-method","html_id":"new(uuid:UUID|CSUUID)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"uuid","doc":null,"default_value":"","external_name":"uuid","restriction":"UUID | CSUUID"}],"args_string":"(uuid : UUID | CSUUID)","args_html":"(uuid : UUID | <a href=\"CSUUID.html\">CSUUID</a>)","location":{"filename":"src/csuuid.cr","line_number":64,"url":null},"def":{"name":"new","args":[{"name":"uuid","doc":null,"default_value":"","external_name":"uuid","restriction":"UUID | CSUUID"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(uuid)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(timestamp:Time,identifier:Slice(UInt8)|String|Nil=nil)-class-method","html_id":"new(timestamp:Time,identifier:Slice(UInt8)|String|Nil=nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"timestamp","doc":null,"default_value":"","external_name":"timestamp","restriction":"Time"},{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"args_string":"(timestamp : Time, identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","args_html":"(timestamp : <a href=\"Time.html\">Time</a>, identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","location":{"filename":"src/csuuid.cr","line_number":72,"url":null},"def":{"name":"new","args":[{"name":"timestamp","doc":null,"default_value":"","external_name":"timestamp","restriction":"Time"},{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(timestamp, identifier)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(identifier:Slice(UInt8)|String|Nil=nil)-class-method","html_id":"new(identifier:Slice(UInt8)|String|Nil=nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"args_string":"(identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","args_html":"(identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","location":{"filename":"src/csuuid.cr","line_number":76,"url":null},"def":{"name":"new","args":[{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(identifier)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"seconds_and_nanoseconds:Tuple(Int64,Int32)-instance-method","html_id":"seconds_and_nanoseconds:Tuple(Int64,Int32)-instance-method","name":"seconds_and_nanoseconds","doc":"This returns a tuple containing the seconds since the epoch as well\nas the nanoseconds in the current second for the UUID.","summary":"<p>This returns a tuple containing the seconds since the epoch as well as the nanoseconds in the current second for the UUID.</p>","abstract":false,"args":[],"args_string":" : Tuple(Int64, Int32)","args_html":" : Tuple(Int64, Int32)","location":{"filename":"src/csuuid.cr","line_number":103,"url":null},"def":{"name":"seconds_and_nanoseconds","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Tuple(Int64, Int32)","visibility":"Public","body":"sns = @seconds_and_nanoseconds\nif !sns.nil?\n  return sns\nend\nlong_seconds = Slice(UInt8).new(8)\nlong_seconds[2, 6].copy_from(@bytes[4, 6])\n@seconds_and_nanoseconds = {IO::ByteFormat::BigEndian.decode(Int64, long_seconds), IO::ByteFormat::BigEndian.decode(Int32, @bytes[0, 4])}\n"}},{"id":"timestamp:Time-instance-method","html_id":"timestamp:Time-instance-method","name":"timestamp","doc":"Return a Time object representing the timestamp encoded into the UUID as local time.","summary":"<p>Return a Time object representing the timestamp encoded into the UUID as local time.</p>","abstract":false,"args":[],"args_string":" : Time","args_html":" : <a href=\"Time.html\">Time</a>","location":{"filename":"src/csuuid.cr","line_number":116,"url":null},"def":{"name":"timestamp","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Time","visibility":"Public","body":"ts = @timestamp\nif ts.nil?\nelse\n  return ts\nend\nsns = seconds_and_nanoseconds\n@timestamp = Time.new(seconds: sns[0], nanoseconds: sns[1], location: @location)\n"}},{"id":"to_s:String-instance-method","html_id":"to_s:String-instance-method","name":"to_s","doc":"Return the String representation of the UUID.","summary":"<p>Return the String representation of the UUID.</p>","abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/csuuid.cr","line_number":132,"url":null},"def":{"name":"to_s","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"hs = @bytes.hexstring\n\"#{hs[0..7]}-#{hs[8..11]}-#{hs[12..15]}-#{hs[16..19]}-#{hs[20..31]}\"\n"}},{"id":"utc:Time-instance-method","html_id":"utc:Time-instance-method","name":"utc","doc":"Return a Time object representing the timestamp encoded into the UUID as UTC time.","summary":"<p>Return a Time object representing the timestamp encoded into the UUID as UTC time.</p>","abstract":false,"args":[],"args_string":" : Time","args_html":" : <a href=\"Time.html\">Time</a>","location":{"filename":"src/csuuid.cr","line_number":124,"url":null},"def":{"name":"utc","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Time","visibility":"Public","body":"u = @utc\nif u.nil?\nelse\n  return u\nend\nsns = seconds_and_nanoseconds\n@utc = Time.utc(seconds: sns[0], nanoseconds: sns[1])\n"}}],"macros":[],"types":[]},{"html_id":"csuuid/Time","path":"Time.html","kind":"struct","full_name":"Time","name":"Time","abstract":false,"superclass":{"html_id":"csuuid/Struct","kind":"struct","full_name":"Struct","name":"Struct"},"ancestors":[{"html_id":"csuuid/Comparable","kind":"module","full_name":"Comparable","name":"Comparable"},{"html_id":"csuuid/Struct","kind":"struct","full_name":"Struct","name":"Struct"},{"html_id":"csuuid/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"csuuid/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/time.cr","line_number":6,"url":null}],"repository_name":"csuuid","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[{"html_id":"csuuid/Comparable","kind":"module","full_name":"Comparable","name":"Comparable"}],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"`Time` represents a date-time instant in\n[incremental time](https://www.w3.org/International/articles/definitions-time/#incremental_time)\nobserved in a specific time zone.\n\nThe calendaric calculations are based on the rules of the proleptic Gregorian\ncalendar as specified in [ISO 8601](http://xml.coverpages.org/ISO-FDIS-8601.pdf).\nLeap seconds are ignored.\n\nInternally, the time is stored as an `Int64` representing seconds from epoch\n(`0001-01-01 00:00:00.0 UTC`) and an `Int32` representing\nnanosecond-of-second with value range `0..999_999_999`.\n\nThe supported date range is `0001-01-01 00:00:00.0` to\n`9999-12-31 23:59:59.999_999_999` in any local time zone.\n\n### Telling the Time\n\nThere are several methods to retrieve a `Time` instance representing the\ncurrent time:\n\n```\nTime.utc                                        # returns the current time in UTC\nTime.local Time::Location.load(\"Europe/Berlin\") # returns the current time in time zone Europe/Berlin\nTime.local                                      # returns the current time in current time zone\n```\n\nIt is generally recommended to keep instances in UTC and only apply a\nlocal time zone when formatting for user display, unless the domain logic\nrequires having a specific time zone (for example for calendaric operations).\n\n### Creating a Specific Instant\n\n`Time` instances representing a specific instant can be created by\n`.utc` or `.new` with the date-time specified as individual arguments:\n\n```\ntime = Time.utc(2016, 2, 15, 10, 20, 30)\ntime.to_s # => 2016-02-15 10:20:30 UTC\ntime = Time.local(2016, 2, 15, 10, 20, 30, location: Time::Location.load(\"Europe/Berlin\"))\ntime.to_s # => 2016-02-15 10:20:30 +01:00 Europe/Berlin\n# The time-of-day can be omitted and defaults to midnight (start of day):\ntime = Time.utc(2016, 2, 15)\ntime.to_s # => 2016-02-15 00:00:00 UTC\n```\n\n### Retrieving Time Information\n\nEach `Time` instance allows querying calendar data:\n\n```\ntime = Time.utc(2016, 2, 15, 10, 20, 30)\ntime.year        # => 2016\ntime.month       # => 2\ntime.day         # => 15\ntime.hour        # => 10\ntime.minute      # => 20\ntime.second      # => 30\ntime.millisecond # => 0\ntime.nanosecond  # => 0\ntime.day_of_week # => Time::DayOfWeek::Monday\ntime.day_of_year # => 46\ntime.monday?     # => true\ntime.time_of_day # => 10:20:30\n```\n\nFor querying if a time is at a specific day of week, `Time` offers named\npredicate methods, delegating to `#day_of_week`:\n\n```\ntime.monday? # => true\n# ...\ntime.sunday? # => false\n```\n\n### Time Zones\n\nEach time is attached to a specific time zone, represented by a `Location`\n(see `#location`).\n`#zone` returns the time zone observed in this location at the current time\n(i.e. the instant represented by this `Time`).\n`#offset` returns the offset of the current zone in seconds.\n\n```\ntime = Time.local(2018, 3, 8, 22, 5, 13, location: Time::Location.load(\"Europe/Berlin\"))\ntime          # => 2018-03-08 22:05:13 +01:00 Europe/Berlin\ntime.location # => #<Time::Location Europe/Berlin>\ntime.zone     # => #<Time::Location::Zone CET +01:00 (3600s) STD>\ntime.offset   # => 3600\n```\n\nUsing `.utc`, the location is `Time::Location::UTC`:\n\n```\ntime = Time.utc(2018, 3, 8, 22, 5, 13)\ntime          # => 2018-03-08 22:05:13.0 UTC\ntime.location # => #<Time::Location UTC>\ntime.zone     # => #<Time::Location::Zone UTC +00:00 (0s) STD>\ntime.offset   # => 0\n```\n\nA `Time` instance can be transformed to a different time zone while retaining\nthe same instant using `#in`:\n\n```\ntime_de = Time.local(2018, 3, 8, 22, 5, 13, location: Time::Location.load(\"Europe/Berlin\"))\ntime_ar = time_de.in Time::Location.load(\"America/Buenos_Aires\")\ntime_de # => 2018-03-08 22:05:13 +01:00 Europe/Berlin\ntime_ar # => 2018-03-08 18:05:13 -03:00 America/Buenos_Aires\n```\n\nBoth `Time` instances show a different local date-time, but they represent\nthe same date-time in the instant time-line, therefore they are considered\nequal:\n\n```\ntime_de.to_utc     # => 2018-03-08 21:05:13 UTC\ntime_ar.to_utc     # => 2018-03-08 21:05:13 UTC\ntime_de == time_ar # => true\n```\n\nThere are also two special methods for converting to UTC and local time zone:\n\n```\ntime.to_utc   # equals time.in(Location::UTC)\ntime.to_local # equals time.in(Location.local)\n```\n\n`#to_local_in` allows changing the time zone while keeping\nthe same local date-time (wall clock) which results in a different instant\non the time line.\n\n### Formatting and Parsing Time\n\nTo make date-time instances exchangeable between different computer systems\nor readable to humans, they are usually converted to and from a string\nrepresentation.\n\nThe method `#to_s` formats the date-time according to a specified pattern.\n\n```\ntime = Time.utc(2015, 10, 12, 10, 30, 0)\ntime.to_s(\"%Y-%m-%d %H:%M:%S %:z\") # => \"2015-10-12 10:30:00 +00:00\"\n```\n\nSimilarly, `Time.parse` and `Time.parse!` are used to construct a `Time` instance from date-time\ninformation in a string, according to a specified pattern:\n\n```\nTime.parse(\"2015-10-12 10:30:00 +00:00\", \"%Y-%m-%d %H:%M:%S %z\", Time::Location::UTC)\nTime.parse!(\"2015-10-12 10:30:00 +00:00\", \"%Y-%m-%d %H:%M:%S %z\")\n```\n\nSee `Time::Format` for all directives.\n\n### Calculations\n\n```\nTime.utc(2015, 10, 10) - 5.days # => 2015-10-05 00:00:00 +00:00\n\nspan = Time.utc(2015, 10, 10) - Time.utc(2015, 9, 10)\nspan.days          # => 30\nspan.total_hours   # => 720\nspan.total_minutes # => 43200\n```\n\n## Measuring Time\n\nThe typical time representation provided by the operating system is based on\na \"wall clock\" which is subject to changes for clock synchronization.\nThis can result in discontinuous jumps in the time-line making it not\nsuitable for accurately measuring elapsed time.\n\nInstances of `Time` are focused on telling time – using a \"wall clock\".\nWhen `Time.local` is called multiple times, the difference between the\nreturned instances is not guaranteed to equal to the time elapsed between\nmaking the calls; even the order of the returned `Time` instances might\nnot reflect invocation order.\n\n```\nt1 = Time.utc\n# operation that takes 1 minute\nt2 = Time.utc\nt2 - t1 # => ?\n```\n\nThe resulting `Time::Span` could be anything, even negative, if the\ncomputer's wall clock has changed between both calls.\n\nAs an alternative, the operating system also provides a monotonic clock.\nIts time-line has no specified starting point but is strictly linearly\nincreasing.\n\nThis monotonic clock should always be used for measuring elapsed time.\n\nA reading from this clock can be taken using `.monotonic`:\n\n```\nt1 = Time.monotonic\n# operation that takes 1 minute\nt2 = Time.monotonic\nt2 - t1 # => 1.minute (approximately)\n```\n\nThe execution time of a block can be measured using `.measure`:\n\n```\nelapsed_time = Time.measure do\n  # operation that takes 20 milliseconds\nend\nelapsed_time # => 20.milliseconds (approximately)\n```","summary":"<p><code><a href=\"Time.html\">Time</a></code> represents a date-time instant in <a href=\"https://www.w3.org/International/articles/definitions-time/#incremental_time\">incremental time</a> observed in a specific time zone.</p>","class_methods":[],"constructors":[],"instance_methods":[{"id":"internal_nanoseconds:Int32-instance-method","html_id":"internal_nanoseconds:Int32-instance-method","name":"internal_nanoseconds","doc":"Return the number of nanoseconds in the current second for this Time instance.","summary":"<p>Return the number of nanoseconds in the current second for this Time instance.</p>","abstract":false,"args":[],"args_string":" : Int32","args_html":" : Int32","location":{"filename":"src/time.cr","line_number":15,"url":null},"def":{"name":"internal_nanoseconds","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@nanoseconds"}},{"id":"internal_seconds:Int64-instance-method","html_id":"internal_seconds:Int64-instance-method","name":"internal_seconds","doc":"Return the number of seconds since the epoch for this Time instance.","summary":"<p>Return the number of seconds since the epoch for this Time instance.</p>","abstract":false,"args":[],"args_string":" : Int64","args_html":" : Int64","location":{"filename":"src/time.cr","line_number":9,"url":null},"def":{"name":"internal_seconds","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@seconds"}}],"macros":[],"types":[]}]}})