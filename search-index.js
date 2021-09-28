crystal_doc_search_index_callback({"repository_name":"csuuid","body":"# CSSUID\n\n![CSUUID CI](https://img.shields.io/github/workflow/status/wyhaines/CSUUID.cr/CSUUID.cr%20CI?style=for-the-badge&logo=GitHub)\n[![GitHub release](https://img.shields.io/github/release/wyhaines/CSUUID.cr.svg?style=for-the-badge)](https://github.com/wyhaines/CSUUID.cr/releases)\n![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/wyhaines/CSUUID.cr/latest?style=for-the-badge)\n\nThis struct wraps up a UUID that encodes a timestamp measured as seconds from the epoch `(0001-01-01 00:00:00.0 UTC)` observed at the location where the timestamp was generated, plus nanoseconds in the current second, plus 6 bytes for unique identification of the source -- this could be an IPV4 address with two null bytes, a MAC address, or some other sequence that will fit in 6 bytes.\n  \nNanoseconds will fit in an Int32 (4 bytes), but seconds since the epoch will not. The current number of seconds leaks a short distance into a 5th byte, meaning that in this class, it has to be represented by an Int64. This is problematic because a UID allows for 16 bytes, so the use of 8 for seconds and 4 for nanoseconds leaves only 4 bytes for system identification. It also leaves three bytes in the UUID as zeros because 8 bytes for seconds is a lot of seconds.\n    \nOne solution is to combine the seconds and the nanoseconds into a single Int64 number. This requires math operations to do efficiently:\n\n```\n(seconds * 1000000000) + nanoseconds\n```\n\nand then more math to extract the original numbers in order to reconstruct the original timestamp. This leaves 8 bytes for identification or other uniqueness information, which is lovely, but the math requirement is less lovely.\n  \nThe other options is to truncate 2 bytes off of the seconds, storing 6 bytes of seconds data. This leaves 6 bytes for identification.\n    \nThe current implementation chose option #2, as it is less work to generate a UUID if math is not involved.\n\n``` \n+-------------+-----------------+------------+\n| nanoseconds |     seconds     | identifier |\n|    0..3     |      4..10      |   11..15   |\n+-------------+-----------------+------------+\n```\n\n## Benchmarks\n\nCSUUID currently benchmarks to be much faster than the standard Crystal UUID class, as of Crystal 1.1.1. See below for some benchmarks.\n\n* Dell XPS 15 - Intel(R) Core(TM) i9-9980HK CPU @ 2.40GHz   2.40 GHz - 32GB RAM\n* Ubuntu 20.04 on WSL1\n* Crystal 1.1.1; LLVM: 10.0.1\n```\nCSUUID.new -- generate random, chronologically sortable UUID   2.78M (359.78ns) (± 2.41%)  48.0B/op        fastest\n                         UUID.random -- generate random UUID   1.07M (937.03ns) (± 2.27%)   0.0B/op   2.60× slower\nCSUUID.unique -- generate 100 guaranteed unique, sortable IDs  27.48k ( 36.39µs) (± 2.37%)  4.7kB/op        fastest\n                        UUID.new -- generate 100 random UUIDs  10.69k ( 93.58µs) (± 2.06%)   0.0B/op   2.57× slower\n```\n\n* Alienware Aurora R11 - Intel(R) Core(TM) i9-10900KF CPU @ 3.70GHz   3.70 GHz - 128GB RAM\n* Ubuntu 20.04 on WSL2\n* Crystal 1.1.1; LLVM: 10.0.1\n```\nCSUUID.new -- generate random, chronologically sortable UUID   6.09M (164.22ns) (± 1.21%)  48.0B/op        fastest\n                         UUID.random -- generate random UUID   3.41M (292.86ns) (± 2.46%)   0.0B/op   1.78× slower\nCSUUID.unique -- generate 100 guaranteed unique, sortable IDs  58.49k ( 17.10µs) (± 1.51%)  4.69kB/op        fastest\n                        UUID.new -- generate 100 random UUIDs  34.58k ( 28.92µs) (± 1.02%)    0.0B/op   1.69× slower\n```\n\n## Installation\n\n1. Add the dependency to your `shard.yml`:\n\n   ```yaml\n   dependencies:\n     cssuid:\n       github: wyhaines/cssuid\n   ```\n\n2. Run `shards install`\n\n## Usage\n\n```crystal\nrequire \"cssuid\"\n\nuuid = CSUUID.new\n\nuuid = CSUUID.new(seconds: 9223372036, nanoseconds: 729262400)\n\nuuid = CSUUID.new(identifier: Random.new.random_bytes(6))\n\ndt = ParseDate.parse(\"2020/07/29 09:15:37\")\nuuid = CSUUID.new(dt)\n```\n\n## Contributing\n\n1. Fork it (<https://github.com/wyhaines/parsedate/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [Kirk Haines](https://github.com/wyhaines) - creator and maintainer\n\n![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wyhaines/CSUUID.cr?style=for-the-badge)\n![GitHub issues](https://img.shields.io/github/issues/wyhaines/CSUUID.cr?style=for-the-badge)","program":{"html_id":"csuuid/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"csuuid","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"csuuid/CSUUID","path":"CSUUID.html","kind":"struct","full_name":"CSUUID","name":"CSUUID","abstract":false,"superclass":{"html_id":"csuuid/Struct","kind":"struct","full_name":"Struct","name":"Struct"},"ancestors":[{"html_id":"csuuid/Struct","kind":"struct","full_name":"Struct","name":"Struct"},{"html_id":"csuuid/Value","kind":"struct","full_name":"Value","name":"Value"},{"html_id":"csuuid/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/csuuid.cr","line_number":42,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L42"}],"repository_name":"csuuid","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.2.3\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"This struct wraps up a UUID that encodes a timestamp measured as seconds\nfrom the epoch (0001-01-01 00:00:00.0 UTC) observed at the location where\nthe timestamp was generated, plus nanoseconds in the current second, plus\n6 bytes for unique identification of the source -- this could be an\nIPV4 address with two null bytes, a MAC address, or some other sequence\nthat will fit in 6 bytes.\n\nNanoseconds will fit in an Int32 (4 bytes), but seconds since the epoch\nwill not. The current number of seconds leaks a short distance into a\n5th byte, meaning that in this class, it has to be represented by an\nInt64. This is problematic because a UID allows for 16 bytes, so the\nuse of 8 for seconds and 4 for nanoseconds leaves only 4 bytes for system\nidentification. It also leaves three bytes in the UUID as zeros because 8\nbytes for seconds is a lot of seconds.\n\nOne solution is to combine the seconds and the nanoseconds into a single\nInt64 number. This requires math operations to do efficiently:\n    (seconds * 1000000000) + nanoseconds\nand then more math to extract the original numbers in order to reconstruct\nthe original timestamp. This leaves 8 bytes for identification or other\nuniqueness information, which is lovely, but the math requirement is less\nlovely.\n\nThe other options is to truncate 2 bytes off of the seconds, storing\n6 bytes of seconds data. This leaves 6 bytes for identification.\n\nThe current implementation chose option #2, as it is less work to generate\na UUID if math is not involved.\n\n```plain\n+-------------+-----------------+------------+\n| nanoseconds |     seconds     | identifier |\n|    0..3     |      4..10      |   11..15   |\n+-------------+-----------------+------------+\n```\n","summary":"<p>This struct wraps up a UUID that encodes a timestamp measured as seconds from the epoch (0001-01-01 00:00:00.0 UTC) observed at the location where the timestamp was generated, plus nanoseconds in the current second, plus 6 bytes for unique identification of the source -- this could be an IPV4 address with two null bytes, a MAC address, or some other sequence that will fit in 6 bytes.</p>","class_methods":[{"html_id":"generate(count)-class-method","name":"generate","doc":null,"summary":null,"abstract":false,"args":[{"name":"count","doc":null,"default_value":"","external_name":"count","restriction":""}],"args_string":"(count)","args_html":"(count)","location":{"filename":"src/csuuid.cr","line_number":77,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L77"},"def":{"name":"generate","args":[{"name":"count","doc":null,"default_value":"","external_name":"count","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"result = [] of CSUUID\ncount.times do\n  result << unique\nend\nresult\n"}},{"html_id":"unique-class-method","name":"unique","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/csuuid.cr","line_number":58,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L58"},"def":{"name":"unique","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@@mutex.sync do\n  t = Time.local\n  if (t.internal_nanoseconds == @@unique_seconds_and_nanoseconds[1]) && (t.internal_seconds == @@unique_seconds_and_nanoseconds[0])\n    increment_unique_identifier\n  else\n    @@unique_seconds_and_nanoseconds = {t.internal_seconds, t.internal_nanoseconds}\n    @@unique_identifier = @@prng.random_bytes(6)\n  end\n  new(@@unique_seconds_and_nanoseconds[0], @@unique_seconds_and_nanoseconds[1], @@unique_identifier)\nend"}}],"constructors":[{"html_id":"new(seconds:Int64,nanoseconds:Int32,identifier:Slice(UInt8)|String|Nil=nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"seconds","doc":null,"default_value":"","external_name":"seconds","restriction":"Int64"},{"name":"nanoseconds","doc":null,"default_value":"","external_name":"nanoseconds","restriction":"Int32"},{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"args_string":"(seconds : Int64, nanoseconds : Int32, identifier : Slice(UInt8) | String | Nil = nil)","args_html":"(seconds : Int64, nanoseconds : Int32, identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","location":{"filename":"src/csuuid.cr","line_number":102,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L102"},"def":{"name":"new","args":[{"name":"seconds","doc":null,"default_value":"","external_name":"seconds","restriction":"Int64"},{"name":"nanoseconds","doc":null,"default_value":"","external_name":"nanoseconds","restriction":"Int32"},{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(seconds, nanoseconds, identifier)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"html_id":"new(uuid:String)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"uuid","doc":null,"default_value":"","external_name":"uuid","restriction":"String"}],"args_string":"(uuid : String)","args_html":"(uuid : String)","location":{"filename":"src/csuuid.cr","line_number":94,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L94"},"def":{"name":"new","args":[{"name":"uuid","doc":null,"default_value":"","external_name":"uuid","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(uuid)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"html_id":"new(uuid:UUID|CSUUID)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"uuid","doc":null,"default_value":"","external_name":"uuid","restriction":"UUID | CSUUID"}],"args_string":"(uuid : UUID | CSUUID)","args_html":"(uuid : UUID | <a href=\"CSUUID.html\">CSUUID</a>)","location":{"filename":"src/csuuid.cr","line_number":98,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L98"},"def":{"name":"new","args":[{"name":"uuid","doc":null,"default_value":"","external_name":"uuid","restriction":"UUID | CSUUID"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(uuid)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"html_id":"new(timestamp:Time,identifier:Slice(UInt8)|String|Nil=nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"timestamp","doc":null,"default_value":"","external_name":"timestamp","restriction":"Time"},{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"args_string":"(timestamp : Time, identifier : Slice(UInt8) | String | Nil = nil)","args_html":"(timestamp : Time, identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","location":{"filename":"src/csuuid.cr","line_number":106,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L106"},"def":{"name":"new","args":[{"name":"timestamp","doc":null,"default_value":"","external_name":"timestamp","restriction":"Time"},{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(timestamp, identifier)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"html_id":"new(identifier:Slice(UInt8)|String|Nil=nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"args_string":"(identifier : Slice(UInt8) | String | Nil = nil)","args_html":"(identifier : Slice(UInt8) | String | Nil = <span class=\"n\">nil</span>)","location":{"filename":"src/csuuid.cr","line_number":110,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L110"},"def":{"name":"new","args":[{"name":"identifier","doc":null,"default_value":"nil","external_name":"identifier","restriction":"Slice(UInt8) | String | Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(identifier)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"html_id":"seconds_and_nanoseconds:Tuple(Int64,Int32)-instance-method","name":"seconds_and_nanoseconds","doc":"This returns a tuple containing the seconds since the epoch as well\nas the nanoseconds in the current second for the UUID.","summary":"<p>This returns a tuple containing the seconds since the epoch as well as the nanoseconds in the current second for the UUID.</p>","abstract":false,"args":[],"args_string":" : Tuple(Int64, Int32)","args_html":" : Tuple(Int64, Int32)","location":{"filename":"src/csuuid.cr","line_number":138,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L138"},"def":{"name":"seconds_and_nanoseconds","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Tuple(Int64, Int32)","visibility":"Public","body":"sns = @seconds_and_nanoseconds\nif !sns.nil?\n  return sns\nend\nlong_seconds = Slice(UInt8).new(8)\nlong_seconds[2, 6].copy_from(@bytes[4, 6])\n@seconds_and_nanoseconds = {IO::ByteFormat::BigEndian.decode(Int64, long_seconds), IO::ByteFormat::BigEndian.decode(Int32, @bytes[0, 4])}\n"}},{"html_id":"timestamp:Time-instance-method","name":"timestamp","doc":"Return a Time object representing the timestamp encoded into the UUID as local time.","summary":"<p>Return a Time object representing the timestamp encoded into the UUID as local time.</p>","abstract":false,"args":[],"args_string":" : Time","args_html":" : Time","location":{"filename":"src/csuuid.cr","line_number":151,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L151"},"def":{"name":"timestamp","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Time","visibility":"Public","body":"ts = @timestamp\nif ts.nil?\nelse\n  return ts\nend\nsns = seconds_and_nanoseconds\n@timestamp = Time.new(seconds: sns[0], nanoseconds: sns[1], location: @location)\n"}},{"html_id":"to_s(io:IO):Nil-instance-method","name":"to_s","doc":"Return the String representation of the UUID.","summary":"<p>Return the String representation of the UUID.</p>","abstract":false,"args":[{"name":"io","doc":null,"default_value":"","external_name":"io","restriction":"IO"}],"args_string":"(io : IO) : Nil","args_html":"(io : IO) : Nil","location":{"filename":"src/csuuid.cr","line_number":167,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L167"},"def":{"name":"to_s","args":[{"name":"io","doc":null,"default_value":"","external_name":"io","restriction":"IO"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Nil","visibility":"Public","body":"hs = @bytes.hexstring\nio << \"#{hs[0..7]}-#{hs[8..11]}-#{hs[12..15]}-#{hs[16..19]}-#{hs[20..31]}\"\n"}},{"html_id":"utc:Time-instance-method","name":"utc","doc":"Return a Time object representing the timestamp encoded into the UUID as UTC time.","summary":"<p>Return a Time object representing the timestamp encoded into the UUID as UTC time.</p>","abstract":false,"args":[],"args_string":" : Time","args_html":" : Time","location":{"filename":"src/csuuid.cr","line_number":159,"url":"https://github.com/wyhaines/csuuid.cr/blob/9b56cca4b47b9080f30ff6eed21bb701c908206a/src/csuuid.cr#L159"},"def":{"name":"utc","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Time","visibility":"Public","body":"u = @utc\nif u.nil?\nelse\n  return u\nend\nsns = seconds_and_nanoseconds\n@utc = Time.utc(seconds: sns[0], nanoseconds: sns[1])\n"}}],"macros":[],"types":[]}]}})