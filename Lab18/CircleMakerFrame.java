package guiLab1;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

/**
 * This is my first GUI assignment. Make a button that, when clicked, draws a
 * circle at a random location.
 * 
 * @author Eddie Gurnee
 * @version 0.0.01 11/19/2013
 * @since 11/19/2013
 * 
 */
@SuppressWarnings("serial")
public class CircleMakerFrame extends JFrame {
	private final int WIDTH = 600;
	private final int HEIGHT = 650;

	private JPanel centerDiv = new JPanel(new FlowLayout(FlowLayout.LEADING));

	private int circlesCreated = 0;

	public CircleMakerFrame() {
		super();
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setLayout(new BorderLayout(5, 5));
		this.setSize(WIDTH, HEIGHT);

		this.setLocationRelativeTo(null);

		JButton circleMaker = new JButton("Make me a circle "
				+ "worthy of Mordor.");
		circleMaker.addActionListener(new CircleActionListener());

		add(circleMaker, BorderLayout.SOUTH);
		add(centerDiv, BorderLayout.CENTER);
	}

	private class CircleActionListener implements ActionListener {

		@Override
		public void actionPerformed(ActionEvent e) {
			centerDiv.add(new ItsACircle());
			CircleMakerFrame.this.repaint();
		}

	}

	private class ItsACircle extends JPanel {

		private final int WIDTH = 600;
		private final int HEIGHT = 600;

		private ItsACircle() {
			super();
			this.setSize(WIDTH, HEIGHT);
		}

		@Override
		public void paintComponent(Graphics g) {
			super.paintComponent(g);
			
			g.setColor(Color.DARK_GRAY);
			g.fillRect(0, 0, WIDTH, HEIGHT);
			
			int color = (int) (Math.random() * 6);
			
			switch (color) {
			case 0:
				g.setColor(Color.RED);
				break;
			case 1:
				g.setColor(Color.ORANGE);
				break;
			case 2:
				g.setColor(Color.YELLOW);
				break;
			case 3:
				g.setColor(Color.GREEN);
				break;
			case 4:
				g.setColor(Color.BLUE);
				break;
			case 5:
				g.setColor(Color.MAGENTA);
				break;
			default:
				g.setColor(Color.BLACK);
				break;
			}

			g.fillOval(
					((int) (Math.random() * (WIDTH * 3 / 4.0))),
					((int) (Math.random() * (HEIGHT * 3 / 4.0))),
					WIDTH / 4,
					HEIGHT / 4);
		}
	}
}
