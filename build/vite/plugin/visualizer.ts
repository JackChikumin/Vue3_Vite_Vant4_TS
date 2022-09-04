/**
 * Package file volume analysis
 */
import { isReportMode } from '../../utils';
import visualizer from 'rollup-plugin-visualizer';

export function configVisualizerConfig() {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }
  return [];
}
