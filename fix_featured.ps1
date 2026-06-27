$file = 'c:\Users\Pongo\Downloads\Compressed\newReynaldo-portoflio-main\src\components\portfolio\CreativeVideos.tsx'
$lines = Get-Content $file
$before = $lines[0..659]
$after = $lines[717..($lines.Count-1)]
$new = @(
  "",
  "        {/* Info overlay */}",
  "        <div className=""absolute bottom-0 left-0 right-0 p-3 md:p-8"">",
  "          <div className=""flex flex-wrap items-center gap-1 mb-1 md:gap-2 md:mb-2"">",
  "            <span",
  "              className=""text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full text-white""",
  "              style={{ background: accentColor }}",
  "            >",
  "              ✦ FEATURED",
  "            </span>",
  "            {video.awards && video.awards.length > 0",
  "              ? video.awards.map((aw) => (",
  "                  <span",
  "                    key={aw.label}",
  "                    className=""flex items-center gap-0.5 text-[10px] md:text-xs font-semibold text-yellow-400 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm""",
  "                  >",
  "                    {aw.icon}{' '}{aw.label}",
  "                  </span>",
  "                ))",
  "              : video.award && (",
  "                  <span className=""flex items-center gap-1 text-[10px] md:text-xs font-semibold text-yellow-400 bg-black/40 px-1.5 py-0.5 rounded-full backdrop-blur-sm"">",
  "                    <Trophy className=""w-3 h-3"" />",
  "                    {video.award}",
  "                  </span>",
  "                )}",
  "          </div>",
  "          <h2 className=""text-white text-sm md:text-3xl font-bold leading-tight mb-0.5 md:mb-1 drop-shadow-lg line-clamp-2"">",
  "            {video.title}",
  "          </h2>",
  "          {video.role && (",
  "            <p className=""text-white/60 text-[10px] md:text-xs mb-0.5"">",
  "              Role:{' '}",
  "              <span className=""text-white/90 font-semibold"">{video.role}</span>",
  "              {video.platform && (",
  "                <span className=""ml-1"">· {video.platform}</span>",
  "              )}",
  "            </p>",
  "          )}",
  "          <div className=""flex items-center gap-2 mt-1 md:mt-3"">",
  "            <span className=""text-white/50 text-[10px] md:text-xs flex items-center gap-1"">",
  "              <Calendar className=""w-2.5 h-2.5 md:w-3 md:h-3"" /> {video.year}",
  "            </span>",
  "          </div>",
  "        </div>"
)
$result = $before + $new + $after
$result | Set-Content $file
Write-Host "Done: $($result.Count) lines"
