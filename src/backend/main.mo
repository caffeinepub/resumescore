import Types "types/analysis";
import CommonTypes "types/common";
import AnalysisMixin "mixins/analysis-api";
import Map "mo:core/Map";

actor {
  let analyses = Map.empty<CommonTypes.AnalysisId, Types.Analysis>();
  let nextId = { var value : Nat = 0 };

  include AnalysisMixin(analyses, nextId);
};
