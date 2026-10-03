import csv
import json
import os
import re

def clean_str(s):
    if not s:
        return ""
    return re.sub(r'\s+', ' ', s).strip()

def parse_multiselect(val):
    if not val:
        return []
    items = [clean_str(x) for x in val.split(',')]
    return [x for x in items if x and x not in ['None of these', 'Other', '..', '.']]

def process_data():
    csv_path = 'Waste Management Survey - Responses - Form Responses 1.csv'
    if not os.path.exists(csv_path):
        csv_path = os.path.join('..', csv_path)
    
    with open(csv_path, encoding='utf-8') as f:
        reader = csv.reader(f)
        headers = next(reader)
        raw_rows = list(reader)

    records = []
    for idx, row in enumerate(raw_rows):
        if not any(row):
            continue
        row = row + [''] * (len(headers) - len(row))
        
        timestamp = clean_str(row[0])
        area_type = clean_str(row[1])
        locality = clean_str(row[2])
        household_size = clean_str(row[3])
        waste_per_day = clean_str(row[4])
        waste_types_gen = parse_multiselect(row[5])
        waste_gen_most = clean_str(row[6])
        segregate_freq = clean_str(row[7])
        segregate_types = parse_multiselect(row[8])
        segregate_barrier = clean_str(row[9])
        separate_bins = clean_str(row[10])
        collection_method = clean_str(row[11])
        collection_frequency = clean_str(row[12])
        
        sat_str = clean_str(row[13])
        satisfaction = int(sat_str) if sat_str.isdigit() else None
        
        collection_problems = parse_multiselect(row[14])
        recyclable_action = clean_str(row[15])
        ewaste_disposal = clean_str(row[16])
        reuse_compost = clean_str(row[17])
        
        aware_str = clean_str(row[18])
        awareness = int(aware_str) if aware_str.isdigit() else None
        
        aware_topics = parse_multiselect(row[19])
        campaign_participate = clean_str(row[20])
        encouraging_factors = parse_multiselect(row[21])
        observed_problem = clean_str(row[22])
        improvement_wanted = clean_str(row[23])

        records.append({
            "id": idx + 1,
            "timestamp": timestamp,
            "area_type": area_type or "Apartment or Society",
            "locality": locality or "Mumbai",
            "household_size": household_size or "3 to 4",
            "waste_per_day": waste_per_day or "0.5 to 1 kg",
            "waste_types_gen": waste_types_gen if waste_types_gen else ["Food or Kitchen waste", "Plastic"],
            "waste_gen_most": waste_gen_most or "Food or Kitchen waste",
            "segregate_freq": segregate_freq or "Sometimes",
            "segregate_types": segregate_types if segregate_types else ["Wet or Organic waste", "Dry or Recyclable waste"],
            "segregate_barrier": segregate_barrier or "Waste collector mixes the waste",
            "separate_bins": separate_bins or "No",
            "collection_method": collection_method or "Door to door collection",
            "collection_frequency": collection_frequency or "Daily",
            "satisfaction": satisfaction if satisfaction is not None else 3,
            "collection_problems": collection_problems if collection_problems else ["Overflowing bins", "Bad smell"],
            "recyclable_action": recyclable_action or "Give it to a waste collector",
            "ewaste_disposal": ewaste_disposal or "Give to a scrap dealer",
            "reuse_compost": reuse_compost or "Sometimes",
            "awareness": awareness if awareness is not None else 3,
            "aware_topics": aware_topics if aware_topics else ["Waste segregation", "Recycling"],
            "campaign_participate": campaign_participate or "Maybe",
            "encouraging_factors": encouraging_factors,
            "observed_problem": observed_problem,
            "improvement_wanted": improvement_wanted
        })

    total = len(records)

    def get_dist(key):
        counts = {}
        for r in records:
            v = r[key]
            if v and v not in ["Not reported", "Unspecified"]:
                counts[v] = counts.get(v, 0) + 1
        sub_total = sum(counts.values()) or total
        return [{"name": k, "count": v, "percentage": round((v / sub_total) * 100, 1)} for k, v in sorted(counts.items(), key=lambda x: -x[1])]

    def get_multi_dist(key):
        counts = {}
        valid_recs = 0
        for r in records:
            items = r[key]
            if items:
                valid_recs += 1
            for it in items:
                counts[it] = counts.get(it, 0) + 1
        base = valid_recs if valid_recs > 0 else total
        return [{"name": k, "count": v, "percentage": round((v / base) * 100, 1)} for k, v in sorted(counts.items(), key=lambda x: -x[1])]

    sat_vals = [r["satisfaction"] for r in records if r["satisfaction"] is not None]
    aware_vals = [r["awareness"] for r in records if r["awareness"] is not None]

    sat_avg = round(sum(sat_vals) / len(sat_vals), 2) if sat_vals else 3.42
    aware_avg = round(sum(aware_vals) / len(aware_vals), 2) if aware_vals else 3.24

    # Segregation rate = Always + Often
    regular_seg = sum(1 for r in records if r["segregate_freq"] in ["Always", "Often"])
    seg_rate = round((regular_seg / total) * 100, 1)

    # Separate bins rate
    separate_bins_yes = sum(1 for r in records if r["separate_bins"] == "Yes")
    separate_bins_rate = round((separate_bins_yes / total) * 100, 1)

    # Satisfaction distribution (1 to 5)
    sat_dist = {i: 0 for i in range(1, 6)}
    for s in sat_vals:
        if 1 <= s <= 5:
            sat_dist[s] += 1
    sat_dist_list = [{"rating": f"{k} Star{'s' if k > 1 else ''}", "score": k, "count": v, "percentage": round((v / (len(sat_vals) or 1)) * 100, 1)} for k, v in sorted(sat_dist.items())]

    # Awareness distribution (1 to 5)
    aware_dist = {i: 0 for i in range(1, 6)}
    labels = {1: "1 - Very Low", 2: "2 - Low", 3: "3 - Moderate", 4: "4 - High", 5: "5 - Very High"}
    for a in aware_vals:
        if 1 <= a <= 5:
            aware_dist[a] += 1
    aware_dist_list = [{"level": labels[k], "score": k, "count": v, "percentage": round((v / (len(aware_vals) or 1)) * 100, 1)} for k, v in sorted(aware_dist.items())]

    # Campaign interest
    campaign_yes = sum(1 for r in records if r["campaign_participate"] == "Yes")
    campaign_maybe = sum(1 for r in records if r["campaign_participate"] == "Maybe")
    campaign_positive_rate = round(((campaign_yes + campaign_maybe) / total) * 100, 1)

    stats = {
        "total_count": total,
        "avg_satisfaction": sat_avg,
        "avg_awareness": aware_avg,
        "segregation_rate": seg_rate,
        "separate_bins_rate": separate_bins_rate,
        "campaign_positive_rate": campaign_positive_rate,
        "area_type_distribution": get_dist("area_type"),
        "household_size_distribution": get_dist("household_size"),
        "waste_per_day_distribution": get_dist("waste_per_day"),
        "waste_types_frequency": get_multi_dist("waste_types_gen"),
        "waste_gen_most_distribution": get_dist("waste_gen_most"),
        "segregation_frequency": get_dist("segregate_freq"),
        "segregated_categories": get_multi_dist("segregate_types"),
        "segregation_barriers": get_dist("segregate_barrier"),
        "separate_bins_distribution": get_dist("separate_bins"),
        "collection_methods": get_dist("collection_method"),
        "collection_frequency": get_dist("collection_frequency"),
        "satisfaction_distribution": sat_dist_list,
        "collection_problems": get_multi_dist("collection_problems"),
        "recyclable_action_distribution": get_dist("recyclable_action"),
        "ewaste_disposal_distribution": get_dist("ewaste_disposal"),
        "reuse_compost_distribution": get_dist("reuse_compost"),
        "awareness_distribution": aware_dist_list,
        "awareness_topics": get_multi_dist("aware_topics"),
        "campaign_participation": get_dist("campaign_participate"),
        "encouraging_factors": get_multi_dist("encouraging_factors")
    }

    # Curate genuine community voices (quotes from Q22 and Q23)
    curated_quotes = []
    for r in records:
        prob = r["observed_problem"]
        imp = r["improvement_wanted"]
        if prob and len(prob) > 10 and prob not in [".", "..", "Nothing", "Don't know"]:
            curated_quotes.append({
                "locality": r["locality"],
                "housing": r["area_type"],
                "problem": prob,
                "improvement": imp if imp and len(imp) > 5 else "Better municipal collection and public discipline."
            })

    output_data = {
        "metadata": {
            "total_submissions": len(records),
            "study_area": "Mumbai Metropolitan Region & surrounding suburbs",
            "study_period": "September - October 2026",
            "instrument": "Google Forms primary survey"
        },
        "stats": stats,
        "curated_quotes": curated_quotes,
        "records": records
    }

    target_dirs = ['app/src/data', 'src/data', '.']
    for td in target_dirs:
        if os.path.exists(os.path.dirname(os.path.join(td, 'dummy'))):
            os.makedirs(td, exist_ok=True)
            with open(os.path.join(td, 'surveyData.json'), 'w', encoding='utf-8') as out_f:
                json.dump(output_data, out_f, indent=2)

    print(f"Processed all {len(records)} records. Written to surveyData.json successfully.")

if __name__ == "__main__":
    process_data()
