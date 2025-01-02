export type UserStatsQuery = {
  week_start: Date;
  insight_count: string;
  tag_count: string;
  streak: string;
};

export function getUserStatsQuery(): string {
  return `
      with team_installation_dates as ( select u.id as userId, i.id as teamId, i."createdAt" as installationDate
                                        from users u
                                                 inner join installations i on u."teamId" = i.id ),
           start_week as ( select greatest(date_trunc('week', current_date) - interval '12 weeks',
                                           date_trunc('week', min(installationDate))) as week_start
                           from team_installation_dates ),
           weeks as ( select generate_series(( select week_start from start_week ), date_trunc('week', current_date),
                                             interval '1 week') as week_start ),
           insight_counts as ( select date_trunc('week', i."createdAt") as week_start, count(i.id) as insight_count
                               from insights i
                               where i."userId" = $1
                               group by 1 ),
           tag_counts as ( select date_trunc('week', i."createdAt") as week_start,
                                  count(distinct it."tagsId")       as tag_count
                           from insights i
                                    inner join insight_tag it on i.id = it."insightsId"
                           where i."userId" = $1
                           group by 1 ),
           weekly_data as ( select w.week_start,
                                   coalesce(ic.insight_count, 0) as insight_count,
                                   coalesce(tc.tag_count, 0)     as tag_count
                            from weeks w
                                     left join insight_counts ic on w.week_start = ic.week_start
                                     left join tag_counts tc on w.week_start = tc.week_start
                            order by w.week_start ),
           streak_groups as ( select week_start,
                                     insight_count,
                                     tag_count,
                                     sum(case when insight_count = 0 then 1 else 0 end)
                                     over (order by week_start rows between unbounded preceding and current row) as streak_group
                              from weekly_data ),
           streaks as ( select week_start,
                               insight_count,
                               tag_count,
                               case when week_start = date_trunc('week', current_date) then 0
                                    when insight_count > 0
                                        then row_number() over (partition by streak_group order by week_start) - 1
                                    else 0 end as streak
                        from streak_groups ),
           final_streaks as ( select week_start,
                                     insight_count,
                                     tag_count,
                                     case when streak is null
                                              then ( select max(streak) from streaks where streak is not null )
                                          else streak end as streak
                              from streaks )
      select week_start, insight_count, tag_count, streak
      from final_streaks
      order by week_start desc;
  `;
}
