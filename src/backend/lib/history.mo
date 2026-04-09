import Types "../types/analysis";
import CommonTypes "../types/common";
import AnalysisLib "analysis";
import Map "mo:core/Map";
import Iter "mo:core/Iter";

module {
  public func addAnalysis(
    analyses : Map.Map<CommonTypes.AnalysisId, Types.Analysis>,
    analysis : Types.Analysis,
  ) {
    analyses.add(analysis.id, analysis);
  };

  public func getAnalysis(
    analyses : Map.Map<CommonTypes.AnalysisId, Types.Analysis>,
    id : CommonTypes.AnalysisId,
  ) : ?Types.Analysis {
    analyses.get(id);
  };

  public func deleteAnalysis(
    analyses : Map.Map<CommonTypes.AnalysisId, Types.Analysis>,
    id : CommonTypes.AnalysisId,
  ) : Bool {
    switch (analyses.get(id)) {
      case null { false };
      case (?_) {
        analyses.remove(id);
        true;
      };
    };
  };

  public func listSummaries(
    analyses : Map.Map<CommonTypes.AnalysisId, Types.Analysis>,
  ) : [Types.AnalysisSummary] {
    let summaries = analyses.values().map(
      func(a) { AnalysisLib.toSummary(a) }
    );
    summaries.toArray();
  };
};
